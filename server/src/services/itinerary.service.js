import { Itinerary } from "../models/Itinerary.js";
import { ApiError } from "../utils/ApiError.js";
import { generateItineraryFromBooking } from "./ai.service.js";

export const generateAndSaveItinerary = async (userId, bookingText) => {
  const structured = await generateItineraryFromBooking(bookingText);

  return Itinerary.create({
    user: userId,
    rawBookingText: bookingText,
    tripSummary: structured.tripSummary,
    flights: structured.flights,
    hotels: structured.hotels,
    dayWiseItinerary: structured.dayWiseItinerary,
    recommendations: structured.recommendations,
  });
};

export const getUserItineraries = (userId) =>
  Itinerary.find({ user: userId })
    .select("-rawBookingText")
    .sort({ createdAt: -1 });

export const getItineraryById = async (userId, id) => {
  const doc = await Itinerary.findOne({ _id: id, user: userId });
  if (!doc) throw new ApiError(404, "Itinerary not found");
  return doc;
};

export const deleteItinerary = async (userId, id) => {
  const doc = await Itinerary.findOneAndDelete({ _id: id, user: userId });
  if (!doc) throw new ApiError(404, "Itinerary not found");
  return doc;
};
