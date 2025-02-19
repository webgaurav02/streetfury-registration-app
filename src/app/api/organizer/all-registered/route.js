import connectMongo from '../../../../lib/mongodb';
import Participant from '../../../../models/Participant';

export async function GET(req) {
    try {
        await connectMongo();

        const participants = await Participant.find({ registered: true }).sort({ createdAt: -1 });

        return new Response(JSON.stringify({ success: true, participants }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
}
