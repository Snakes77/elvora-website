import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, service, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: `Elvora Contact <${process.env.FROM_EMAIL}>`,
            to: [process.env.CONTACT_EMAIL || 'melissa@elvoraconsulting.co.uk'],
            subject: `New Consultation Request: ${service}`,
            replyTo: email,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 12px;">
          <h2 style="color: #0d9488; margin-top: 0;">New Consultation Request</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
          <p><strong>Service Requested:</strong> ${service}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
            <p style="margin-top: 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #6b7280;">This email was sent from the Elvora Consulting contact form.</p>
        </div>
      `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
