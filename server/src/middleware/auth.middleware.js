import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/token.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, no token");
  }

  const token = header.split(" ")[1];
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new ApiError(401, "User no longer exists");

  req.user = user;
  next();
});
