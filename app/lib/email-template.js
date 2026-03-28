// Email template for Reparent Guide
export function getReparentEmail(archetype, userName = '') {
  const archetypeInfo = {
    Overgiver: {
      title: "The Overgiver",
      quote: "I learned to love by giving parts of myself away.",
      color: "#D8A7B1"
    },
    Controller: {
      title: "The Controller",
      quote: "If I manage everything, maybe nothing will fall apart again.",
      color: "#1E5F74"
    },
    Avoider: {
      title: "The Avoider",
      quote: "When feelings get too loud, I disappear to survive.",
      color: "#3A5A40"
    },
    Conscious: {
      title: "Conscious / Balanced",
      quote: "I respond, not react — and I don't lose myself in love.",
      color: "#C7A86C"
    }
  };

  const data = archetypeInfo[archetype] || archetypeInfo.Conscious;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Reparent Guide</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: ${data.color}20; padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${data.color}; line-height: 1.2;">
                ${data.title}
              </h1>
              <p style="margin: 20px 0 0; font-size: 18px; font-style: italic; color: #374151; line-height: 1.6;">
                "${data.quote}"
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #1f2937; line-height: 1.8;">
                ${userName ? `Hi ${userName},` : 'Hi there,'}
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; color: #1f2937; line-height: 1.8;">
                Thank you for taking the time to explore your parenting patterns with Reparent.
                Your results reveal that you resonate most with <strong>${data.title}</strong>.
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; color: #1f2937; line-height: 1.8;">
                This is the beginning of a beautiful journey toward more conscious, connected parenting — one that starts with reparenting yourself.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/results"
                       style="display: inline-block; padding: 16px 32px; background-color: ${data.color}; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px;">
                      View Your Full Results →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 16px; color: #1f2937; line-height: 1.8;">
                <strong>What's next?</strong>
              </p>

              <ul style="margin: 0 0 20px; padding-left: 20px; color: #1f2937; font-size: 16px; line-height: 1.8;">
                <li style="margin-bottom: 12px;">Reflect on your core wound and healing direction</li>
                <li style="margin-bottom: 12px;">Notice the patterns showing up in your daily parenting</li>
                <li style="margin-bottom: 12px;">Practice self-compassion as you grow</li>
              </ul>

              <p style="margin: 30px 0 0; font-size: 14px; color: #6b7280; line-height: 1.6; font-style: italic;">
                Remember: awareness is the first step. You're already doing the work by being here.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Sent with care from <strong>Reparent</strong>
              </p>
              <p style="margin: 10px 0 0; font-size: 12px; color: #9ca3af;">
                Your journey stays private — always.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
