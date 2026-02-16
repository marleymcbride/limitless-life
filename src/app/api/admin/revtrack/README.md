# Revtrack API Endpoint

## Overview
This endpoint provides revenue and sales tracking data for marketing campaigns.

## Endpoint
`GET /api/admin/revtrack`

## Authentication
Requires `x-admin-api-key` header with valid admin API key.

## Response
```json
{
  "campaigns": [
    {
      "id": "rec123456",
      "name": "Campaign Name",
      "category": "video" | "comm" | "web",
      "utmCampaign": "utm-campaign-name",
      "sourceUrl": "https://example.com/campaign",
      "publishedAt": "2024-01-15",
      "firstEventAt": "2024-01-15",
      "views": 1000,
      "clicks": 100,
      "emails": 50,
      "sales": 5,
      "revenue": 500,
      "revenuePerView": 0.5
    }
  ],
  "total": 10
}
```

## Setup Requirements

### Environment Variables
Add the following to your `.env.local` file:

```bash
# Airtable Configuration
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_ACCESS_TOKEN=your_access_token
AIRTABLE_CAMPAIGNS_TABLE_ID=your_campaigns_table_id

# Admin API Key (already configured)
ADMIN_API_KEY=your_admin_api_key
```

### Getting Airtable Credentials

1. **Base ID**:
   - Go to https://airtable.com/api
   - Select your base
   - The Base ID is in the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - Copy the part after `/app/`

2. **Access Token**:
   - Go to https://airtable.com/create/tokens
   - Create a new token
   - Grant read access to: Campaigns table
   - Copy the token

3. **Campaigns Table ID**:
   - In Airtable API docs, find your table
   - The Table ID is shown in the documentation
   - Or check the URL when viewing table: `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX/...`
   - Copy the part after `/t/`

## Testing

### Unit Tests
Run the unit tests (doesn't require server):
```bash
npx tsx src/app/api/admin/revtrack/route.test.ts
```

### Manual API Testing
1. Start the dev server:
```bash
npm run dev
```

2. Run the curl test script:
```bash
./src/app/api/admin/revtrack/test-curl.sh
```

3. Or test manually with curl:
```bash
# Without auth (should return 401)
curl http://localhost:3000/api/admin/revtrack

# With invalid auth (should return 401)
curl -H "x-admin-api-key: invalid" http://localhost:3000/api/admin/revtrack

# With valid auth
curl -H "x-admin-api-key: YOUR_ADMIN_API_KEY" http://localhost:3000/api/admin/revtrack
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Server Error
```json
{
  "error": "Failed to fetch campaigns",
  "message": "Error details..."
}
```

## Implementation Notes

- The `revenuePerView` field is calculated as `revenue / views` (or 0 if views = 0)
- Campaigns are sorted by `Published` date in descending order
- The endpoint uses the Airtable client from `@/lib/airtable`
- Authentication uses the `ADMIN_API_KEY` from environment variables

## Future Enhancements

- Add pagination for large campaign datasets
- Add filtering by category, date range, or UTM campaign
- Add caching to reduce Airtable API calls
- Add metrics aggregation (total revenue, average revenue per view, etc.)
