# PostgreSQL Schema Fix Report
**Generated:** 2026-02-15
**Status:** ⚠️ **REQUIRES MIGRATION**
**Priority:** **HIGH** - n8n webhooks failing

---

## 📋 Executive Summary

The n8n/Airtable integration is failing because the `lead_alerts` table schema doesn't match the documentation specification. The n8n workflow is trying to insert `email`, `score`, and `trigger_event` columns that don't exist in the actual table.

**Impact:** Hot lead alerts are not syncing to Airtable CRM.

**Solution:** Run the migration SQL to add missing columns and backfill existing data.

---

## 🔍 Schema Comparison

### Table: `lead_alerts`

| Column Name | In Spec | In Actual | Status | Notes |
|-------------|----------|-----------|--------|-------|
| id | ✅ | ✅ | ✅ Match | UUID primary key |
| user_id | ✅ | ✅ | ✅ Match | FK to users.id |
| email | ✅ | ❌ | ❌ **MISSING** | Needed by n8n webhook |
| score | ✅ | ❌ | ❌ **MISSING** | Needed by n8n webhook |
| trigger_event | ✅ | ❌ | ❌ **MISSING** | Needed by n8n webhook |
| alert_type | ❌ | ✅ | ⚠️ Extra | Not in spec, but exists |
| created_at | ✅ | ❌ | ⚠️ Rename | Actual has `sent_at` |
| first_contact_at | ❌ | ✅ | ⚠️ Extra | Not in spec, but exists |
| response_time_seconds | ❌ | ✅ | ⚠️ Extra | Not in spec, but exists |

### Other Tables Status

| Table | Status | Notes |
|-------|--------|-------|
| users | ✅ Match | All columns correct |
| events | ✅ Match | All columns correct |
| payments | ✅ Match | All columns correct |
| sessions | ✅ Exists | Not in spec, used by events table |
| application_submissions | ✅ Exists | Not in spec, used by app |
| webhook_queue | ✅ Exists | Not in spec, used by app |

---

## 🛠️ Required Actions

### Option 1: Run Migration SQL (RECOMMENDED)

**File:** `migrations/fix_lead_alerts_schema.sql`

**Steps:**
1. Connect to Railway PostgreSQL database
2. Run the migration SQL:
   ```bash
   psql -h turntable.proxy.rlwy.net -p 40464 -U postgres -d railway -f migrations/fix_lead_alerts_schema.sql
   ```
3. Verify with the verification query at the bottom of the file
4. Test n8n webhook again

**What the migration does:**
- ✅ Adds `email TEXT` column
- ✅ Adds `score INTEGER` column
- ✅ Adds `trigger_event TEXT` column
- ✅ Renames `sent_at` → `created_at`
- ✅ Backfills `email` from users table for existing records
- ✅ Backfills `score` from users table for existing records
- ✅ Creates performance indexes on new columns

### Option 2: Update n8n Query (ALTERNATIVE)

If you prefer not to modify the database, update the n8n workflow query to use existing columns:

**Change FROM:**
```sql
SELECT
  la.id,
  u.email,
  la.score,
  la.trigger_event,
  la.created_at
FROM lead_alerts la
JOIN users u ON la.user_id = u.id
WHERE la.alert_type = 'hot_lead';
```

**Change TO:**
```sql
SELECT
  la.id,
  u.email,
  u.lead_score as score,
  la.alert_type as trigger_event,
  la.sent_at as created_at
FROM lead_alerts la
JOIN users u ON la.user_id = u.id
WHERE la.alert_type = 'hot_lead';
```

**Trade-off:**
- ✅ No database changes needed
- ❌ Requires updating n8n workflow
- ❌ Loses historical score tracking (can't see score at alert time)
- ❌ Less explicit (trigger_event inferred from alert_type)

**Recommendation:** Use Option 1 (migration) for clarity and data integrity.

---

## 📊 Column Name Mapping (For n8n Workflows)

If any column names differ between spec and actual, use this mapping:

| Documentation Spec | Actual Database | n8n Query Should Use |
|------------------|------------------|---------------------|
| email | email (after migration) | email |
| score | score (after migration) | score |
| trigger_event | trigger_event (after migration) | trigger_event |
| created_at | created_at (after migration) | created_at |

**Before migration:**
| Documentation Spec | Actual Database | n8n Query Should Use |
|------------------|------------------|---------------------|
| email | ❌ doesn't exist | u.email (join users table) |
| score | ❌ doesn't exist | u.lead_score (join users table) |
| trigger_event | ❌ doesn't exist | la.alert_type (map: alert_type) |
| created_at | sent_at | la.sent_at (use actual name) |

---

## 🎯 What I Need Back From You

After running the migration (or Option 2), please provide:

### 1. Schema Verification
Run this query and provide the full output:
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'lead_alerts'
ORDER BY ordinal_position;
```

### 2. Confirmation
- [ ] Migration SQL executed successfully
- [ ] Verification query shows all expected columns present
- [ ] Existing data backfilled correctly (email, score populated)
- [ ] Indexes created successfully

### 3. Column Name Differences (if any)
If any column names still differ from the spec, list them:
```
Spec Name: ________ → Actual Name: ________
Spec Name: ________ → Actual Name: ________
```

---

## 🧪 Testing After Migration

### Test 1: Verify Schema
```sql
-- Should return 8 rows (all columns present)
SELECT COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'lead_alerts';
```

### Test 2: Check Data Integrity
```sql
-- Verify backfilled data
SELECT
  COUNT(*) as total_alerts,
  COUNT(email) as emails_populated,
  COUNT(score) as scores_populated,
  COUNT(trigger_event) as triggers_populated
FROM lead_alerts;
```

### Test 3: Test n8n Webhook
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Schema Fix Test",
    "score": 75,
    "whatTheyDid": "Testing after schema migration",
    "phone": "+1234567890"
  }'
```

**Expected Result:**
- ✅ n8n workflow executes without column errors
- ✅ Record inserted into lead_alerts with all fields
- ✅ Airtable CRM receives hot lead alert

---

## 📝 Migration Rollback (If Needed)

If you need to rollback the migration:

```sql
-- Drop indexes
DROP INDEX IF EXISTS idx_lead_alerts_email;
DROP INDEX IF EXISTS idx_lead_alerts_score;
DROP INDEX IF EXISTS idx_lead_alerts_created_at;

-- Remove added columns
ALTER TABLE lead_alerts DROP COLUMN IF EXISTS email;
ALTER TABLE lead_alerts DROP COLUMN IF EXISTS score;
ALTER TABLE lead_alerts DROP COLUMN IF EXISTS trigger_event;

-- Rename column back
ALTER TABLE lead_alerts RENAME COLUMN created_at TO sent_at;
```

Then update n8n workflows to use Option 2 queries instead.

---

## 📞 Next Steps

1. **Review this report** and choose Option 1 (migration) or Option 2 (update n8n)
2. **Execute the chosen option** using the SQL/queries provided
3. **Verify the schema** using the verification query
4. **Test the n8n webhook** using the provided curl command
5. **Provide the verification output** as specified in "What I Need Back" section
6. **Update integration docs** if any column names still differ

---

## 📋 Files Generated

1. `migrations/fix_lead_alerts_schema.sql` - Complete migration SQL with verification and rollback
2. `SCHEMA_FIX_REPORT.md` - This report (summary and analysis)

Both files have been committed to git for version control.

---

**Migration Priority:** HIGH
**Time to Execute:** ~5 minutes
**Risk Level:** LOW (adds columns, preserves data, includes rollback)
**Blocking:** n8n/Airtable integration
