// api/contact.js
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Enable CORS
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

        // Validate
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Sending email via Resend...');

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: 'MA Agency <onboarding@resend.dev>', // Use your domain later
            to: ['ma.webagency@outlook.com'], // Your email
            subject: `New message from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        h3 { color: #ef4444; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #333; }
                        .value { color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h3>✨ New Contact Form Submission</h3>
                        
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${email}</div>
                        </div>
                        
                        ${company ? `
                        <div class="field">
                            <div class="label">Company:</div>
                            <div class="value">${company}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${message.replace(/\n/g, '<br/>')}</div>
                        </div>
                        
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                        
                        <p style="color: #999; font-size: 12px;">
                            Sent from MA Agency website contact form
                        </p>
                    </div>
                </body>
                </html>
            `,
            replyTo: email,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
Message:
${message}
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            throw error;
        }

        console.log('Email sent successfully:', data);

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack
        });

        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message
        });
    }
}