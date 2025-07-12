import { cookies } from 'next/headers';
import ApiError from '@/app/utils/ApiError';
import { NextResponse } from 'next/server';
import handleRouteError from '@/app/utils/handleRouteError';
import Payment from "@/app/lib/models/model.payment";
import { userAuth } from '@/app/lib/auth/authMIddleware';
import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import dbConnect from '@/app/lib/db.connect';

export const POST = handleRouteError(async (request) => {
    await dbConnect();

    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        throw new ApiError(401, "Authentication token missing");
    }

    const user = await userAuth(token);
    if (!user || !user._id) {
        throw new ApiError(401, "Invalid token");
    }

    const now = DateTime.utc();
    const currentMonth = now.month; 
    const currentYear = now.year;

    const yearStart = DateTime.utc(currentYear, 1, 1).toJSDate();
    const yearEnd = DateTime.utc(currentYear + 1, 1, 1).toJSDate();

    const payments = await Payment.find({
        user: new mongoose.Types.ObjectId(user._id),
        createdAt: {
            $gte: yearStart,
            $lt: yearEnd
        }
    }).sort({ createdAt: -1 }); 

    const hasPaidCurrentMonth = payments.some(payment => payment.month === currentMonth);

    return NextResponse.json({
        success: true,
        payments,
        hasPaidCurrentMonth
    }, { status: 200 });
});
