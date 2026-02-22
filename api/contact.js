// api/contact.js
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, company, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Missing required fields',
                fields: { name: !!name, email: !!email, message: !!message }
            });
        }

        console.log('Sending email via Resend...', { to: process.env.CONTACT_EMAIL });

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'MA Agency <onboarding@resend.dev>', // You can change this later
            to: [process.env.CONTACT_EMAIL || 'ma.webagency@outlook.com'],
            subject: `New message from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        h2 { color: #ef4444; margin-bottom: 30px; }
                        .field { margin-bottom: 20px; }
                        .label { font-weight: 600; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
                        .value { font-size: 16px; color: #111; background: #f9f9f9; padding: 10px; border-radius: 8px; margin-top: 4px; }
                        .message { white-space: pre-wrap; }
                        hr { border: none; border-top: 1px solid #eee; margin: 30px 0; }
                        .footer { color: #999; font-size: 12px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>✨ New Contact Form Submission</h2>
                        
                        <div class="field">
                            <div class="label">Name</div>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email</div>
                            <div class="value">${email}</div>
                        </div>
                        
                        ${company ? `
                        <div class="field">
                            <div class="label">Company</div>
                            <div class="value">${company}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Message</div>
                            <div class="value message">${message.replace(/\n/g, '<br/>')}</div>
                        </div>
                        
                        <hr />
                        
                        <div class="footer">
                            Sent from MA Agency website contact form
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
Message:
${message}
            `,
            replyTo: email,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({
                error: 'Failed to send email',
                details: error.message
            });
        }

        console.log('Email sent successfully:', data);
        return res.status(200).json({
            success: true,
            messageId: data?.id
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({
            error: 'Server error',
            details: error.message
        });
    }
}