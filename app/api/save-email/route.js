export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get the Google Apps Script webhook URL from environment variable
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('GOOGLE_SCRIPT_WEBHOOK_URL not configured');
      // Still return success to user, but log the error
      return Response.json({ success: true });
    }

    // Send to Google Sheets via Apps Script webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || 'unknown'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save to Google Sheets');
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Error saving email:', error);
    // Return success anyway to not block user flow
    return Response.json({ success: true });
  }
}
