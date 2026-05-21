import { Router } from "express";
import * as itineraryController from "../controllers/itinerary.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/generate", itineraryController.generate);
router.get("/", itineraryController.list);

router
  .route("/:id")
  .get(itineraryController.getOne)
  .delete(itineraryController.remove);

export default router;
