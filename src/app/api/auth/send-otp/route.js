import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendOtpEmail } from '../../../../lib/nodemailer';
import Participant from '../../../../models/Participant';
import Otp from '../../../../models/Otp';
import connectMongo from '../../../../lib/mongodb'
import verificationEmail from '../../../../templates/verificationEmail.hbs'

import { NextResponse } from 'next/server';

export async function POST(req) {

  connectMongo();

  try {
    const { email } = await req.json();

    // Check if the email or password is missing
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Check if a user with the same email already exists
    const existingUser = await Participant.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    const otpGen = new Otp({
      otp: hashedOTP,
      otpExpiry,
    });

    await otpGen.save();

    const emailHtml = verificationEmail({
      otp: otp
    });

    await sendOtpEmail(email, emailHtml);

    return NextResponse.json({ message: 'OTP created. Please verify your email.', otpId: otpGen._id }, { status: 201 });

  } catch (error) {
    console.error('Error creating otp:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
