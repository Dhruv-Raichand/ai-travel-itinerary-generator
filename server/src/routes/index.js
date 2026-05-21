import { Router } from "express";
import authRoutes from "./auth.routes.js";
import itineraryRoutes from "./itinerary.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/itineraries", itineraryRoutes);

export default router;
