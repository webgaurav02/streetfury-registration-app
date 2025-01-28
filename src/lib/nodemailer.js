import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent, pdfBuffer, ticketId) => {

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let attachments = null;

        if (ticketId) {
            attachments = [
                {
                    filename: `ticket_${ticketId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ]
        }

        if (!htmlContent) {
            htmlContent = "A new submission has been received"
        }

        // Set email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
            attachments: attachments,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendOtpEmail = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `
          <p>Thank you for registering. Please use the OTP below to verify your email:</p>
          <h3>${otp}</h3>
          <p>This OTP is valid for 10 minutes.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
}