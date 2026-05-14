import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')
}

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@steptogetherdance.com'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'hello@steptogetherdance.com'

export async function sendContactConfirmation(name: string, email: string, subject: string) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'We received your message — Step Together Line Dance',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAF6EE;padding:40px;border-radius:8px;">
        <h1 style="color:#1B2A4A;font-size:28px;">Thank you, ${name}!</h1>
        <p style="color:#555;font-size:16px;line-height:1.6;">We received your message about <strong>${subject}</strong> and will get back to you within 24–48 hours.</p>
        <hr style="border:1px solid #EDE3CE;margin:30px 0;" />
        <p style="color:#C0522A;font-size:14px;font-weight:bold;">Step Together Line Dance</p>
      </div>
    `,
  })
}

export async function sendRegistrationConfirmation(name: string, email: string, eventTitle: string, eventDate: string, eventLocation: string) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `You're registered! ${eventTitle} — Step Together Line Dance`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAF6EE;padding:40px;border-radius:8px;">
        <h1 style="color:#1B2A4A;font-size:28px;">You're in, ${name}!</h1>
        <p style="color:#555;">Your registration for <strong>${eventTitle}</strong> is confirmed.</p>
        <div style="background:#1B2A4A;color:white;padding:20px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;font-size:16px;"><strong>${eventTitle}</strong></p>
          <p style="margin:8px 0 0;opacity:0.8;">${eventDate}</p>
          <p style="margin:4px 0 0;opacity:0.8;">${eventLocation}</p>
        </div>
        <p style="color:#C0522A;font-weight:bold;">Step Together Line Dance</p>
      </div>
    `,
  })
}

export async function sendNewsletterWelcome(name: string, email: string) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Welcome to the Step Together community!',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAF6EE;padding:40px;border-radius:8px;">
        <h1 style="color:#1B2A4A;font-size:28px;">Welcome, ${name || 'dancer'}!</h1>
        <p style="color:#555;font-size:16px;line-height:1.6;">You're now part of the Step Together community. Connecting People Through Line Dance.</p>
        <p style="color:#C0522A;font-weight:bold;">Step Together Line Dance</p>
      </div>
    `,
  })
}
