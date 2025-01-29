import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

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

export const sendOtpEmail = async (email, emailHtml) => {

    try {
        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Set email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Minus01 Verification Code',
            html: emailHtml,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}