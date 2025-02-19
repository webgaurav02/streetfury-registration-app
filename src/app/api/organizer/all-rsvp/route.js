import connectMongo from '../../../../lib/mongodb';
import Rsvp from '../../../../models/Rsvp';

export async function GET(req) {
    try {
        await connectMongo();

        const rsvpAll = await Rsvp.find().sort({ createdAt: -1 });

        return new Response(JSON.stringify({ success: true, rsvpAll }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
}
