import { cookies } from 'next/headers';
import ApiError from '@/app/utils/ApiError';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';
import handleRouteError from '@/app/utils/handleRouteError';
import User from '@/app/lib/models/model.user';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export const POST = handleRouteError(async (request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('otp_token')?.value;
    if (!token) {
        throw new ApiError(401, "OTP token missing");
    }
        const decoded = jwt.verify(token, JWT_SECRET);
        const { otp, phoneNumber } = decoded;
        const body = await request.json();
        if (body !== otp) {
            throw new ApiError(400, "Invalid OTP");
        }
        console.log(decoded);
        return NextResponse.json({
            success:true,
            message: "Account created successfully"
        },{status:200})
    })
export const GET = (request)=>{
    const response = NextResponse.json({
        success: true,
        message: "OTP sent to your phone number. Please verify.",
    }, { status: 200 });
    return response;
}
