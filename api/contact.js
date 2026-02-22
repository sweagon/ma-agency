// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log environment variables (without showing full password)
    console.log('SMTP Config Check:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        hasPassword: !!process.env.SMTP_PASS,
        contactEmail: process.env.CONTACT_EMAIL
    });

    // Create transporter with debug enabled
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        debug: true, // Enable debug logs
        logger: true, // Log to console
        tls: {
            rejectUnauthorized: false // Only for testing
        }
    });

    try {
        // Verify connection first
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        // Send email
        console.log('Attempting to send email...');
        const info = await transporter.sendMail({
            from: `"MA Agency Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });

        console.log('Email sent successfully:', info);
        console.log('Message ID:', info.messageId);
        console.log('Accepted:', info.accepted);
        console.log('Response:', info.response);

        res.status(200).json({
            success: true,
            messageId: info.messageId
        });

    } catch (error) {
        console.error('SMTP Error Details:');
        console.error('Code:', error.code);
        console.error('Command:', error.command);
        console.error('Response:', error.response);
        console.error('ResponseCode:', error.responseCode);
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);

        res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
            code: error.code
        });
    }
}