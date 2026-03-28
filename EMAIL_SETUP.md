# Email Collection Setup (100% Free)

## Setup Instructions (5 minutes)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Reparent Emails"
3. In the first row, add headers:
   - Column A: `Email`
   - Column B: `Timestamp`
   - Column C: `User Agent`

### Step 2: Add Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Append a new row with the data
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.userAgent || 'unknown'
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Click **Deploy** → **New deployment**
6. Click the gear icon ⚙️ → Select **Web app**
7. Configure:
   - **Description**: "Email webhook"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
8. Click **Deploy**
9. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Step 3: Add to Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `GOOGLE_SCRIPT_WEBHOOK_URL`
   - **Value**: [Paste the Web App URL you copied]
5. Save and redeploy your app

## Done! 🎉

Now when users submit their email, it will automatically be saved to your Google Sheet.

## Testing

1. Submit a test email on your site
2. Check your Google Sheet - you should see a new row!

## Notes

- ✅ Completely free, no limits
- ✅ View/export emails anytime in Google Sheets
- ✅ Real-time updates
- ⚠️ If you update the Apps Script code, you need to create a **new deployment** (not update existing)

## Troubleshooting

**Emails not appearing?**
1. Check the Apps Script execution logs: Extensions → Apps Script → Executions
2. Make sure the deployment is set to "Anyone" access
3. Verify the webhook URL in Vercel environment variables
