"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItineraryCard, type ItineraryItem } from "@/components/itinerary-card"
import { TravelTimeline } from "@/components/travel-timeline"
import { CalendarDays, List, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const sampleItinerary: ItineraryItem[] = [
  {
    id: "1",
    type: "flight",
    title: "San Francisco → Tokyo",
    subtitle: "United Airlines",
    date: "Jun 15, 2026",
    time: "10:30 AM",
    location: "SFO International",
    status: "upcoming",
    details: {
      flightNumber: "UA837",
      terminal: "G",
      gate: "G94",
    },
  },
  {
    id: "2",
    type: "hotel",
    title: "Park Hyatt Tokyo",
    subtitle: "Shinjuku, Tokyo",
    date: "Jun 16-20, 2026",
    time: "3:00 PM Check-in",
    location: "Tokyo, Japan",
    status: "upcoming",
    details: {
      roomType: "Deluxe King",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
    },
  },
  {
    id: "3",
    type: "activity",
    title: "Senso-ji Temple Visit",
    subtitle: "Guided walking tour",
    date: "Jun 17, 2026",
    time: "9:00 AM",
    location: "Asakusa, Tokyo",
    status: "upcoming",
    details: {
      duration: "3 hours",
    },
  },
  {
    id: "4",
    type: "flight",
    title: "Tokyo → San Francisco",
    subtitle: "United Airlines",
    date: "Jun 20, 2026",
    time: "6:00 PM",
    location: "NRT International",
    status: "upcoming",
    details: {
      flightNumber: "UA838",
      terminal: "1",
      gate: "42A",
    },
  },
]

const timelineEvents = [
  {
    id: "1",
    time: "6:00 AM",
    title: "Wake up & Breakfast",
    description: "Hotel breakfast at New York Grill",
    type: "food" as const,
    status: "completed" as const,
  },
  {
    id: "2",
    time: "9:00 AM",
    title: "Senso-ji Temple",
    description: "Visit the historic temple and explore Nakamise Street",
    type: "sightseeing" as const,
    status: "current" as const,
  },
  {
    id: "3",
    time: "12:30 PM",
    title: "Lunch at Asakusa",
    description: "Traditional ramen at a local shop",
    type: "food" as const,
    status: "upcoming" as const,
  },
  {
    id: "4",
    time: "2:00 PM",
    title: "TeamLab Borderless",
    description: "Digital art museum experience",
    type: "activity" as const,
    status: "upcoming" as const,
  },
  {
    id: "5",
    time: "6:00 PM",
    title: "Shibuya Crossing",
    description: "Experience the famous intersection",
    type: "sightseeing" as const,
    status: "upcoming" as const,
  },
  {
    id: "6",
    time: "8:00 PM",
    title: "Dinner in Shibuya",
    description: "Yakiniku restaurant reservation",
    type: "food" as const,
    status: "upcoming" as const,
  },
]

const tripDates = [
  "Jun 15, 2026",
  "Jun 16, 2026",
  "Jun 17, 2026",
  "Jun 18, 2026",
  "Jun 19, 2026",
  "Jun 20, 2026",
]

export function TripOverview() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(2)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-card-foreground">
            Tokyo Adventure
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            June 15-20, 2026 • 6 days
          </p>
        </div>
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
          Active Trip
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="itinerary" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="itinerary" className="gap-2">
              <List className="h-4 w-4" />
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-3">
            {sampleItinerary.map((item) => (
              <ItineraryCard key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            {/* Date selector */}
            <div className="flex items-center justify-between rounded-lg bg-secondary p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setSelectedDateIndex(Math.max(0, selectedDateIndex - 1))
                }
                disabled={selectedDateIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-1 overflow-x-auto px-2">
                {tripDates.map((date, index) => (
                  <Button
                    key={date}
                    variant={index === selectedDateIndex ? "default" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setSelectedDateIndex(index)}
                  >
                    {date.split(",")[0]}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setSelectedDateIndex(
                    Math.min(tripDates.length - 1, selectedDateIndex + 1)
                  )
                }
                disabled={selectedDateIndex === tripDates.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <TravelTimeline
              events={timelineEvents}
              selectedDate={tripDates[selectedDateIndex]}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
