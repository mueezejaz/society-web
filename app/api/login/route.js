import dbConnect from '@/app/lib/db.connect';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from "@/app/lib/models/model.user.js"
import handleRouteError from '@/app/utils/handleRouteError';
import ApiError from '@/app/utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXPIRES_IN_MINUTES = 5;

function isValidPakPhone(phone) {
  return /^03\d{9}$/.test(phone);
}

export const POST = handleRouteError(async (request) => {
  await dbConnect();
  const { phoneNumber, password } = await request.json();

  if (!phoneNumber || !password) {
    throw new ApiError(400, "Phone number and password are required");
  }

  if (!isValidPakPhone(phoneNumber)) {
    throw new ApiError(400, "Phone number must be in the format 03XXXXXXXXX (Pakistani)");
  }

    const existingUser = await User.findOne({ phoneNumber: phoneNumber });
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Incorrect password");
  }

  const token = jwt.sign(
    {
      userId: existingUser._id,
      phoneNumber: existingUser.phoneNumber,
    },
    JWT_SECRET,
    { expiresIn: `${OTP_EXPIRES_IN_MINUTES}d` }
  );

  // Set token in cookie
  console.log("the role is" , existingUser.role);
  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    user: {
      _id: existingUser._id,
      name: existingUser.name,
      phoneNumber: existingUser.phoneNumber,
      role:existingUser.role,
    }
  }, { status: 200 });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: OTP_EXPIRES_IN_MINUTES * 24 * 60 * 60,
    sameSite: "strict",
    path: "/",
  });

  return response;
});
