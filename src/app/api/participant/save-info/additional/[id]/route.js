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

        const { sport, instagram, youtube, pitch, portfolio, info } = await req.json();

        if (!sport || !instagram || !pitch) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        await connectMongo(); // Connect to the database

        const user = await Participant.findOne({email: id});

        if (!user) {
            return NextResponse.json(
                { error: 'Participant not found' },
                { status: 404 }
            );
        }

        user.sport = sport;
        user.instagram = instagram;
        user.youtube = youtube;
        user.pitch = pitch;
        user.portfolio = portfolio;
        user.info = info;
        user.additionalDone = true;

        await user.save();

        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.error('Error fetching participant:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
