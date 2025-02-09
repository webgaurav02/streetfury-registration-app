import { NextResponse } from 'next/server';
import connectMongo from '../../../../../../lib/mongodb'; // MongoDB connection utility
import Participant from '../../../../../../models/Participant'; // User model
import { sendConfirmationEmail } from '../../../../../../lib/nodemailer';
import confirmationEmail from '../../../../../../templates/confirmationEmail.hbs'
import fs from 'fs';
import path from 'path';

export async function PUT(req, { params }) {
    try {
        const { id } = await params; // Extract the `id` from the dynamic route

        if (!id) {
            return NextResponse.json(
                { error: 'Participant ID is required' },
                { status: 400 }
            );
        }
        await connectMongo(); // Connect to the database

        const user = await Participant.findOne({ email: id });

        if (!user) {
            return NextResponse.json(
                { error: 'Participant not found' },
                { status: 404 }
            );
        }

        user.registered = true;

        await user.save();

        const emailHtml = confirmationEmail({
            firstname: user.firstname,
            lastname: user.lastname,
            sport: user.sport,
            email: user.email,
            phone: user.phone,
            city: user.city,
            state: user.state,
        });

        // Read PDF files from public directory
        const termsOfParticipationPath = path.join(
            process.cwd(),
            'public',
            'pdf',
            'Terms of Participation.pdf'
        );
        const termsOfParticipationBuffer = fs.readFileSync(termsOfParticipationPath);

        const cancellationAndRefundPath = path.join(
            process.cwd(),
            'public',
            'pdf',
            'Cancellations and Refund.pdf'
        );
        const cancellationAndRefundBuffer = fs.readFileSync(cancellationAndRefundPath);

        await sendConfirmationEmail(id, emailHtml, termsOfParticipationBuffer, cancellationAndRefundBuffer);

        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.error('Error fetching participant:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
