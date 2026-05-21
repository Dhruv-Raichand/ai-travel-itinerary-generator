import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    airline: String,
    flightNumber: String,
    from: String,
    to: String,
    departure: String,
    arrival: String,
    class: String,
  },
  { _id: false }
);

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    checkIn: String,
    checkOut: String,
    roomType: String,
    nights: Number,
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    day: Number,
    date: String,
    title: String,
    activities: [String],
  },
  { _id: false }
);

const recommendationSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const tripSummarySchema = new mongoose.Schema(
  {
    title: String,
    destination: String,
    startDate: String,
    endDate: String,
    travelers: String,
    overview: String,
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rawBookingText: { type: String, required: true },
    tripSummary: tripSummarySchema,
    flights: [flightSchema],
    hotels: [hotelSchema],
    dayWiseItinerary: [daySchema],
    recommendations: [recommendationSchema],
  },
  { timestamps: true }
);

export const Itinerary = mongoose.model("Itinerary", itinerarySchema);
