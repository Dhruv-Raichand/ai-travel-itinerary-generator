import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as itineraryService from "../services/itinerary.service.js";

export const generate = asyncHandler(async (req, res) => {
  const bookingText = req.body.bookingText?.trim();

  if (!bookingText) {
    throw new ApiError(400, "bookingText is required");
  }

  const itinerary = await itineraryService.generateAndSaveItinerary(
    req.user._id,
    bookingText
  );

  res.status(201).json({ success: true, data: { itinerary } });
});

export const list = asyncHandler(async (req, res) => {
  const itineraries = await itineraryService.getUserItineraries(req.user._id);
  res.json({ success: true, data: { itineraries } });
});

export const getOne = asyncHandler(async (req, res) => {
  const itinerary = await itineraryService.getItineraryById(
    req.user._id,
    req.params.id
  );
  res.json({ success: true, data: { itinerary } });
});

export const remove = asyncHandler(async (req, res) => {
  await itineraryService.deleteItinerary(req.user._id, req.params.id);
  res.json({ success: true, message: "Itinerary deleted" });
});
