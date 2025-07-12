import { cookies } from 'next/headers';
import ApiError from '@/app/utils/ApiError';
import { NextResponse } from 'next/server';
import handleRouteError from '@/app/utils/handleRouteError';
import Payment from "@/app/lib/models/model.payment";
import { userAuth } from '@/app/lib/auth/authMIddleware';
import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import dbConnect from '@/app/lib/db.connect';

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = handleRouteError(async (request) => {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        throw new ApiError(401, "Authentication token missing");
    }

    const user = await userAuth(token);
    if (!user || !user._id) {
        throw new ApiError(401, "Invalid token");
    }

    const body = await request.json();
    const amount = body.amount;

    if (!amount) {
        throw new ApiError(400, "Payment amount is required");
    }

    const now = DateTime.utc();
    const currentMonth = now.month; // 1 - 12
    const currentYear = now.year;

    const existingPayment = await Payment.findOne({
        user: new mongoose.Types.ObjectId(user._id),
        month: currentMonth,
        createdAt: {
            $gte: new Date(`${currentYear}-${String(currentMonth).padStart(2, '0')}-01T00:00:00Z`),
            $lt: new Date(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01T00:00:00Z`),
        }
    });

    if (existingPayment) {
        throw new ApiError(400, "already payed of this month")
    }

    const newPayment = new Payment({
        user: new mongoose.Types.ObjectId(user.id),
        amount: amount,
        month: currentMonth,
    });

    await newPayment.save();

    return NextResponse.json({ success: true, message: "Payment recorded successfully", payment: newPayment }, { status: 201 });
});