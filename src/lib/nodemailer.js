import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

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
            subject: 'MINUS01 Verification Code',
            html: emailHtml,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}

export const sendConfirmationEmail = async (email, emailHtml, termsOfRegistration, termsOfParticipation, cancellationAndRefund) => {

    try {
        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        //Set attachments
        const attachments = [
            {
                filename: `Terms of Registration.pdf`,
                content: termsOfRegistration,
                contentType: 'application/pdf',
            },
            {
                filename: `Terms of Participation.pdf`,
                content: termsOfParticipation,
                contentType: 'application/pdf',
            },
            {
                filename: `Cancellation and Refund.pdf`,
                content: cancellationAndRefund,
                contentType: 'application/pdf',
            },
        ]

        // Set email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'MINUS01 STREETJAM: Registration Successful!',
            html: emailHtml,
            attachments: attachments,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}