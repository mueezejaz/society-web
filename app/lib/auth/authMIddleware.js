import ApiError from "@/app/utils/ApiError";
import jwt from "jsonwebtoken";
import User from "@/app/lib/models/model.user.js";
import dbConnect from "../db.connect";

const JWT_SECRET = process.env.JWT_SECRET;

export const userAuth = async (token) => {
    await dbConnect();
    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid token");
    }

    if (!decoded.userId) {
        throw new ApiError(401, "Authentication failed");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    return user;
};
