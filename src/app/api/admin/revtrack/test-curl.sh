#!/bin/bash

# Manual API test script for Revtrack endpoint
# Usage: ./test-curl.sh

echo "Testing Revtrack API Endpoint"
echo "=============================="
echo ""

# Check if server is running
echo "1. Checking if server is running..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")

if [ "$HEALTH_CHECK" != "200" ] && [ "$HEALTH_CHECK" != "404" ]; then
  echo "❌ Server is not running. Please start with: npm run dev"
  echo ""
  exit 1
fi

echo "✓ Server is running"
echo ""

# Test 1: Request without API key (should return 401)
echo "2. Testing request without API key (should return 401)..."
RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3000/api/admin/revtrack)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "401" ]; then
  echo "✓ Correctly returned 401 Unauthorized"
  echo "  Response: $BODY"
else
  echo "❌ Expected 401, got $HTTP_CODE"
  echo "  Response: $BODY"
fi
echo ""

# Test 2: Request with invalid API key (should return 401)
echo "3. Testing request with invalid API key (should return 401)..."
RESPONSE=$(curl -s -w "\n%{http_code}" -H "x-admin-api-key: invalid-key" http://localhost:3000/api/admin/revtrack)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "401" ]; then
  echo "✓ Correctly returned 401 Unauthorized"
  echo "  Response: $BODY"
else
  echo "❌ Expected 401, got $HTTP_CODE"
  echo "  Response: $BODY"
fi
echo ""

# Test 3: Request with valid API key (should return 200)
echo "4. Testing request with valid API key (should return 200 with data)..."
echo "   Note: This requires ADMIN_API_KEY to be set in .env"

# Try to get the API key from .env
if [ -f .env ]; then
  ADMIN_KEY=$(grep "^ADMIN_API_KEY=" .env | cut -d'=' -f2)

  if [ -n "$ADMIN_KEY" ]; then
    RESPONSE=$(curl -s -w "\n%{http_code}" -H "x-admin-api-key: $ADMIN_KEY" http://localhost:3000/api/admin/revtrack)
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')

    if [ "$HTTP_CODE" = "200" ]; then
      echo "✓ Correctly returned 200 OK"
      echo ""
      echo "Response:"
      echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
      echo ""

      # Validate response structure
      TOTAL=$(echo "$BODY" | jq -r '.total' 2>/dev/null || echo "N/A")
      CAMPAIGNS_COUNT=$(echo "$BODY" | jq -r '.campaigns | length' 2>/dev/null || echo "N/A")

      echo "Summary:"
      echo "  - Total campaigns: $TOTAL"
      echo "  - Campaigns array length: $CAMPAIGNS_COUNT"

      # Check if campaigns have revenuePerView
      FIRST_CAMPAIGN_RPV=$(echo "$BODY" | jq -r '.campaigns[0].revenuePerView' 2>/dev/null || echo "N/A")
      if [ "$FIRST_CAMPAIGN_RPV" != "N/A" ] && [ "$FIRST_CAMPAIGN_RPV" != "null" ]; then
        echo "  - First campaign revenuePerView: $FIRST_CAMPAIGN_RPV"
      fi
    else
      echo "❌ Expected 200, got $HTTP_CODE"
      echo "  Response: $BODY"
    fi
  else
    echo "⚠ ADMIN_API_KEY not found in .env file"
    echo "  Skipping authenticated request test"
  fi
else
  echo "⚠ .env file not found"
  echo "  Skipping authenticated request test"
fi

echo ""
echo "=============================="
echo "Test Complete"
