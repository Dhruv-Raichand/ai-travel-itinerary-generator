import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";

export const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, "Email already in use");

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};
