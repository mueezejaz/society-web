import { cookies } from 'next/headers';
import ApiError from '@/app/utils/ApiError';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';
import handleRouteError from '@/app/utils/handleRouteError';
import User from '@/app/lib/models/model.user';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/db.connect';
const JWT_SECRET = process.env.JWT_SECRET;
export const POST = handleRouteError(async (request) => {
    await dbConnect()
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
        const data = decoded.data;
        const user = new User({
           name:data.name,
           password: data.password,
           houseAddress: data.houseAddress,
           phoneNumber:data.phoneNumber 
        })
        try{
            await user.save();
        }catch(error){
            throw new ApiError(400, error.message || "faild to save user");
        }
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
