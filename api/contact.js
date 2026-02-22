// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Log every request
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('Method:', req.method);
    console.log('Time:', new Date().toISOString());

    // Handle preflight
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS preflight');
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Log received data
        console.log('Request body:', req.body);

        const { name, email, company, message } = req.body;

        // Validate
        if (!name || !email || !message) {
            console.log('Missing fields:', { name: !!name, email: !!email, message: !!message });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check environment variables (without exposing values)
        console.log('Environment variables check:', {
            SMTP_HOST: process.env.SMTP_HOST ? '✓ Set' : '✗ Missing',
            SMTP_PORT: process.env.SMTP_PORT ? '✓ Set' : '✗ Missing',
            SMTP_USER: process.env.SMTP_USER ? '✓ Set' : '✗ Missing',
            SMTP_PASS: process.env.SMTP_PASS ? '✓ Set (hidden)' : '✗ Missing',
            CONTACT_EMAIL: process.env.CONTACT_EMAIL ? '✓ Set' : '✗ Missing',
        });

        // Validate SMTP settings
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error('Missing SMTP configuration');
            return res.status(500).json({ error: 'Server email configuration error' });
        }

        // Create transporter with timeout
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Only for testing
            },
            connectionTimeout: 30000, // 30 seconds
            greetingTimeout: 30000,
            socketTimeout: 30000,
            debug: true, // Enable debug logs
            logger: true, // Log to console
        });

        // Test connection
        console.log('Testing SMTP connection...');
        try {
            await transporter.verify();
            console.log('✅ SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('❌ SMTP verification failed:', {
                message: verifyError.message,
                code: verifyError.code,
                command: verifyError.command,
                response: verifyError.response
            });
            throw verifyError;
        }

        // Prepare email
        const mailOptions = {
            from: `"MA Agency Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}

Message:
${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        };

        console.log('Sending email...');
        console.log('From:', mailOptions.from);
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);

        return res.status(200).json({
            success: true,
            messageId: info.messageId
        });

    } catch (error) {
        // Log EVERYTHING about the error
        console.error('❌ ERROR DETAILS:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Command:', error.command);
        console.error('Response:', error.response);
        console.error('ResponseCode:', error.responseCode);
        console.error('Stack:', error.stack);

        if (error.response) {
            console.error('SMTP Response:', error.response);
        }

        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
            code: error.code
        });
    }
}