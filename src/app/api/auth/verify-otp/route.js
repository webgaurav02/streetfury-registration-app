import bcrypt from 'bcrypt';
import Participant from '../../../../models/Participant';
import Otp from '../../../../models/Otp';
import connectMongo from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  connectMongo();

  try {

    const { otp, otpId } = await req.json();

    if (!otp || !otpId) {
      return NextResponse.json({ error: 'OTP required' }, { status: 400 });
    }

    const otpDoc = await Otp.findById(otpId);

    if (!otpDoc) {
      return NextResponse.json({ error: 'OTP not found' }, { status: 404 });
    }

    // Check if OTP is expired
    if (Date.now() > otpDoc.otpExpiry) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Verify OTP
    const isOtpValid = await bcrypt.compare(otp, otpDoc.otp);
    if (!isOtpValid) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ _id: otpId });

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
