import { NextResponse } from 'next/server';
import connectMongo from '../../../../../../lib/mongodb'; // MongoDB connection utility
import Participant from '../../../../../../models/Participant'; // User model

export async function PUT(req, { params }) {
    try {
        const { id } = await params; // Extract the `id` from the dynamic route

        if (!id) {
            return NextResponse.json(
                { error: 'Participant ID is required' },
                { status: 400 }
            );
        }

        const { firstname, lastname, dob, gender, city, state, phone } = await req.json();

        if (!firstname || !lastname || !dob || !gender || !city || !state || !phone) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        await connectMongo(); // Connect to the database

        const user = await Participant.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'Participant not found' },
                { status: 404 }
            );
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.dob = dob;
        user.gender = gender;
        user.city = city;
        user.state = state;
        user.phone = phone;

        await user.save();

        return NextResponse.json({ participant: user }, { status: 200 });

    } catch (error) {
        console.error('Error fetching participant:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
