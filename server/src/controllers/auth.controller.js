import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const data = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data });
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.loginUser(req.body);
  res.json({ success: true, data });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});
