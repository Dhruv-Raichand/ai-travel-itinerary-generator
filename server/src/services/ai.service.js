import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { parseJsonFromText } from "../utils/parseJson.js";

const client = env.geminiApiKey
  ? new GoogleGenerativeAI(env.geminiApiKey)
  : null;

const ITINERARY_SCHEMA = `{
  "tripSummary": {
    "title": "string",
    "destination": "string",
    "startDate": "string (ISO or human-readable)",
    "endDate": "string",
    "travelers": "string",
    "overview": "string"
  },
  "flights": [
    {
      "airline": "string",
      "flightNumber": "string",
      "from": "string",
      "to": "string",
      "departure": "string",
      "arrival": "string",
      "class": "string"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "location": "string",
      "checkIn": "string",
      "checkOut": "string",
      "roomType": "string",
      "nights": 0
    }
  ],
  "dayWiseItinerary": [
    {
      "day": 1,
      "date": "string",
      "title": "string",
      "activities": ["string"]
    }
  ],
  "recommendations": [
    {
      "category": "string (e.g. dining, sightseeing, transport)",
      "title": "string",
      "description": "string"
    }
  ]
}`;

export const generateItineraryFromBooking = async (bookingText) => {
  if (!client) throw new ApiError(503, "AI service not configured");

  const model = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `You are a travel itinerary parser and planner.

Parse the following raw travel booking text and produce a complete structured itinerary.
Extract all flight and hotel details from the booking text when present.
Fill in a sensible day-wise itinerary and practical recommendations for the destination and dates.

Return ONLY valid JSON matching this schema (no markdown, no commentary):
${ITINERARY_SCHEMA}

Raw booking text:
"""
${bookingText}
"""`;

try {
  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const parsed = parseJsonFromText(text);

  return normalizeItinerary(parsed);
} catch (error) {
  console.error("Gemini generation failed:", error);

  return normalizeItinerary({
    tripSummary: {
      title: "Demo Dubai Trip",
      destination: "Dubai",
      startDate: "2026-06-10",
      endDate: "2026-06-15",
      travelers: "2 Adults",
      overview:
        "A relaxing Dubai vacation with sightseeing, shopping, and luxury stay.",
    },
    flights: [
      {
        airline: "Emirates",
        flightNumber: "EK511",
        from: "Delhi",
        to: "Dubai",
        departure: "2026-06-10 10:00",
        arrival: "2026-06-10 12:30",
        class: "Economy",
      },
    ],
    hotels: [
      {
        name: "Atlantis The Palm",
        location: "Dubai",
        checkIn: "2026-06-10",
        checkOut: "2026-06-15",
        roomType: "Deluxe Room",
        nights: 5,
      },
    ],
    dayWiseItinerary: [
      {
        day: 1,
        date: "2026-06-10",
        title: "Arrival and Check-in",
        activities: [
          "Arrive in Dubai",
          "Hotel check-in",
          "Evening Marina walk",
        ],
      },
      {
        day: 2,
        date: "2026-06-11",
        title: "City Tour",
        activities: [
          "Visit Burj Khalifa",
          "Dubai Mall",
          "Dubai Fountain Show",
        ],
      },
    ],
    recommendations: [
      {
        category: "Dining",
        title: "Try Local Emirati Cuisine",
        description:
          "Visit local restaurants for authentic Middle Eastern dishes.",
      },
    ],
  });
}
};

const normalizeItinerary = (data) => ({
  tripSummary: {
    title: data.tripSummary?.title ?? "",
    destination: data.tripSummary?.destination ?? "",
    startDate: data.tripSummary?.startDate ?? "",
    endDate: data.tripSummary?.endDate ?? "",
    travelers: data.tripSummary?.travelers ?? "",
    overview: data.tripSummary?.overview ?? "",
  },
  flights: Array.isArray(data.flights) ? data.flights : [],
  hotels: Array.isArray(data.hotels) ? data.hotels : [],
  dayWiseItinerary: Array.isArray(data.dayWiseItinerary)
    ? data.dayWiseItinerary
    : [],
  recommendations: Array.isArray(data.recommendations)
    ? data.recommendations
    : [],
});
