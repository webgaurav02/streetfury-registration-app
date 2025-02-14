import { NextResponse } from 'next/server';
import connectMongo from '../../../../../lib/mongodb'; // MongoDB connection utility
import Rsvp from '../../../../../models/Rsvp'; // Rsvp model
import Participant from '../../../../../models/Participant'; // Rsvp model
import { sendConfirmationEmail } from '../../../../../lib/nodemailer';
import confirmationEmail from '../../../../../templates/confirmationEmail.hbs'
import fs from 'fs';
import path from 'path';


export async function POST(req, { params }) {
    try {
        const { id } = await params; // Extract the `id` from the dynamic route

        if (!id) {
            return NextResponse.json(
                { error: 'Rsvp ID is required' },
                { status: 400 }
            );
        }

        const { firstname, lastname, dob, gender, city, state, phone, info } = await req.json();

        if (!firstname || !lastname || !dob || !gender || !city || !state || !phone || !info) {
            return NextResponse.json(
                { error: 'All fields are required' },
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

        // console.log(user)

        const newRsvp = new Rsvp({
            firstname,
            lastname,
            dob,
            gender,
            city,
            state,
            phone,
            email: id,
            info
        });

        await newRsvp.save();

        await Participant.deleteOne({ email: id });

        const emailHtml = confirmationEmail({
            firstname: firstname,
            lastname: lastname,
            email: id,
            phone: phone,
            city: city,
            state: state,
        });
        // Read PDF files from public directory
        const termsOfRegistrationPath = path.join(
            process.cwd(),
            'public',
            'pdf',
            'Terms of Registration.pdf'
        );
        const termsOfRegistrationBuffer = fs.readFileSync(termsOfRegistrationPath);

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

        await sendConfirmationEmail(id, emailHtml, termsOfRegistrationBuffer, termsOfParticipationBuffer, cancellationAndRefundBuffer);

        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.error('Error fetching participant:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
