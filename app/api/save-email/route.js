import { Resend } from 'resend';
import { getReparentEmail } from '../../lib/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, archetype, userName } = await request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Save to Google Sheets
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            archetype: archetype || 'Unknown',
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent') || 'unknown'
          })
        });
      } catch (sheetError) {
        console.error('Failed to save to Google Sheets:', sheetError);
        // Continue even if this fails
      }
    }

    // 2. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Reparent <onboarding@resend.dev>',
          to: [email],
          subject: `Your Reparent Guide: ${archetype || 'Your Journey Begins'}`,
          html: getReparentEmail(archetype, userName),
        });

        if (error) {
          console.error('Resend error:', error);
        } else {
          console.log('Email sent successfully:', data);
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue even if this fails
      }
    } else {
      console.warn('RESEND_API_KEY not configured - skipping email send');
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Error in save-email:', error);
    // Return success anyway to not block user flow
    return Response.json({ success: true });
  }
}
