import dbConnect from '@/app/lib/db.connect';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from "@/app/lib/models/model.user.js"
import handleRouteError from '@/app/utils/handleRouteError';
import ApiError from '@/app/utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXPIRES_IN_MINUTES = 5;

function isValidPakPhone(phone) {
    return /^03\d{9}$/.test(phone);
}

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function normalizePakPhone(phone) {
    return '+92' + phone.slice(1);
}

async function sendOTPViaSMS(phoneNumber, otp) {
    console.log(`📲 Sending OTP ${otp} to ${phoneNumber}`);
}

export const POST = handleRouteError(async (request) => {
    await dbConnect();
    const data = await request.json();
    const { name, password, confirmPassword, flatNumber, houseLatter, phoneNumber } = data;

    if (!name || !password || !confirmPassword || !flatNumber || !houseLatter || !phoneNumber) {
        throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    if (!isValidPakPhone(phoneNumber)) {
        throw new ApiError(400, "Phone number must be in the format 03XXXXXXXXX (Pakistani)");
    }

    const normalizedPhone = normalizePakPhone(phoneNumber);
    const existingUser = await User.findOne({ phoneNumber: normalizedPhone });
    if (existingUser) {
        throw new ApiError(409, "Phone number already registered");
    }
    data.houseAddress = data.houseLatter + "-" + flatNumber;
    const otp = generateOTP();

    const token = jwt.sign(
        {
            otp,
            data: data,
        },
        JWT_SECRET,
        { expiresIn: `${OTP_EXPIRES_IN_MINUTES}m` }
    );

    await sendOTPViaSMS(normalizedPhone, otp);

    const response = NextResponse.json({
        success: true,
        message: "OTP sent to your phone number. Please verify.",
    }, { status: 200 });

    response.cookies.set("otp_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: OTP_EXPIRES_IN_MINUTES * 60,
        sameSite: "strict",
        path: "/",
    });

    return response;
});
