import { NextResponse } from 'next/server';
import connectMongo from '../../../../../lib/mongodb'; // MongoDB connection utility
import Participant from '../../../../../models/Participant'; // User model

export async function GET(req, { params }) {
    try {
        const { id } = await params; // Extract the `id` from the dynamic route

        if (!id) {
            return NextResponse.json(
                { error: 'Participant ID is required' },
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

        return NextResponse.json({participant: user}, { status: 200 });
    } catch (error) {
        console.error('Error fetching participant:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
