import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db.connect';
import User from '@/app/lib/models/model.user';
import Payment from '@/app/lib/models/model.payment';
import { DateTime } from 'luxon';
import handleRouteError from '@/app/utils/handleRouteError';

export const POST = handleRouteError(async (req) => {
  await dbConnect();

  const now = DateTime.utc();
  const currentMonth = now.month;
  const currentYear = now.year;

  const totalUsers = await User.countDocuments();

  const startOfMonth = DateTime.utc(currentYear, currentMonth, 1).toJSDate();
  const startOfNextMonth = DateTime.utc(currentYear, currentMonth + 1, 1).toJSDate();

  const paymentsThisMonth = await Payment.find({
    createdAt: {
      $gte: startOfMonth,
      $lt: startOfNextMonth,
    }
  }).select('user'); // only fetch user field

  const uniqueUserIds = new Set(paymentsThisMonth.map(p => p.user.toString()));
  const paidThisMonth = uniqueUserIds.size;

  const unpaidThisMonth = totalUsers - paidThisMonth;

  return NextResponse.json({
    success: true,
    data: {
      totalUsers,
      paidThisMonth,
      unpaidThisMonth,
    }
  });
});
