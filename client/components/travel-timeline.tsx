"use client"

import { cn } from "@/lib/utils"
import { Plane, Hotel, MapPin, Coffee, Camera, Utensils } from "lucide-react"

interface TimelineEvent {
  id: string
  time: string
  title: string
  description: string
  type: "flight" | "hotel" | "activity" | "food" | "sightseeing" | "break"
  status: "completed" | "current" | "upcoming"
}

const typeIcons = {
  flight: Plane,
  hotel: Hotel,
  activity: MapPin,
  food: Utensils,
  sightseeing: Camera,
  break: Coffee,
}

const typeColors = {
  flight: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  hotel: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  activity: "bg-primary/20 text-primary border-primary/30",
  food: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  sightseeing: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  break: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

interface TravelTimelineProps {
  events: TimelineEvent[]
  selectedDate: string
}

export function TravelTimeline({ events, selectedDate }: TravelTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-card-foreground">{selectedDate}</h3>
        <span className="text-sm text-muted-foreground">
          {events.length} events
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />

        {/* Events */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = typeIcons[event.type]
            const isLast = index === events.length - 1

            return (
              <div key={event.id} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2",
                    typeColors[event.type],
                    event.status === "current" && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 rounded-xl border p-4 transition-colors",
                    event.status === "current"
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-primary">
                        {event.time}
                      </span>
                      <h4 className="mt-1 font-medium text-card-foreground">
                        {event.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    {event.status === "current" && (
                      <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        Now
                      </span>
                    )}
                    {event.status === "completed" && (
                      <span className="shrink-0 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                        Done
                      </span>
                    )}
                  </div>
                </div>

                {/* Connector to next */}
                {!isLast && (
                  <div className="absolute left-[23px] top-12 h-4 w-px bg-border" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
