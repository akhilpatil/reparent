# Email Collection & Automated Emails Setup

This guide covers:
- 📊 Saving emails to Google Sheets (free)
- 📧 Sending automated emails via Resend

## Part 1: Google Sheets Setup (5 minutes)

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

---

# Part 2: Resend Setup (Automated Emails)

## Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and log in
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Reparent Production")
5. Select **Sending access**
6. Click **Add**
7. **Copy the API key** (it starts with `re_...`)
   ⚠️ You won't be able to see it again!

## Step 2: Verify Your Domain (Required for Production)

### Option A: Use Your Own Domain (Recommended)
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)
6. Your from email will be: `Reparent <hello@yourdomain.com>`

### Option B: Use Resend's Test Domain (For Testing Only)
- Free tier includes `onboarding@resend.dev`
- Limited to 100 emails/day
- Good for testing, but not recommended for production

## Step 3: Add Environment Variables to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

**Required:**
- **Name**: `RESEND_API_KEY`
- **Value**: [Your API key from Step 1]

**Required (if using your own domain):**
- **Name**: `RESEND_FROM_EMAIL`
- **Value**: `Reparent <hello@yourdomain.com>`

**Optional (for email links):**
- **Name**: `NEXT_PUBLIC_SITE_URL`
- **Value**: `https://yourdomain.com`

5. Save and redeploy your app

## Step 4: Test It!

1. Go to your site
2. Complete the quiz
3. Submit your email
4. Check your inbox! 📬

## What Users Will Receive

✉️ A beautifully designed email with:
- Their archetype title and quote
- Personalized message
- Link back to their results
- Next steps for their journey

## Email Template Customization

The email template is in `app/lib/email-template.js`

You can customize:
- Colors (matches each archetype)
- Content and messaging
- Call-to-action buttons
- Footer text

## Resend Free Tier Limits

- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Perfect for getting started!

## Monitoring Your Emails

1. Go to Resend dashboard
2. Click **Logs** to see all sent emails
3. Check delivery status, opens, clicks, etc.

## Troubleshooting Resend

**Emails not sending?**
1. Check Resend dashboard → Logs for errors
2. Verify API key is correct in Vercel environment variables
3. Make sure domain is verified (if using custom domain)
4. Check email went to spam folder

**Want to test without sending real emails?**
- Use your own email address first
- Check Resend logs to confirm delivery

---

## 🎉 All Done!

Now your app:
1. ✅ Saves emails to Google Sheets
2. ✅ Sends beautiful automated emails via Resend
3. ✅ Provides a seamless user experience
