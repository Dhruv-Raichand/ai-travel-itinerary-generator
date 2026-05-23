"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Clock,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ItineraryItem {
  id: string
  type: "flight" | "hotel" | "activity"
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  status: "upcoming" | "in-progress" | "completed"
  details?: {
    flightNumber?: string
    terminal?: string
    gate?: string
    checkIn?: string
    checkOut?: string
    roomType?: string
    duration?: string
  }
}

const typeIcons = {
  flight: Plane,
  hotel: Hotel,
  activity: MapPin,
}

const statusColors = {
  upcoming: "bg-primary/20 text-primary",
  "in-progress": "bg-yellow-500/20 text-yellow-500",
  completed: "bg-green-500/20 text-green-500",
}

interface ItineraryCardProps {
  item: ItineraryItem
}

export function ItineraryCard({ item }: ItineraryCardProps) {
  const Icon = typeIcons[item.type]

  return (
    <Card className="group border-border bg-card hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={statusColors[item.status]}
                >
                  {item.status === "in-progress"
                    ? "In Progress"
                    : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Details */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {item.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {item.time}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {item.location}
              </div>
            </div>

            {/* Extra details */}
            {item.details && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.details.flightNumber && (
                  <Badge variant="outline" className="text-xs">
                    Flight {item.details.flightNumber}
                  </Badge>
                )}
                {item.details.terminal && (
                  <Badge variant="outline" className="text-xs">
                    Terminal {item.details.terminal}
                  </Badge>
                )}
                {item.details.gate && (
                  <Badge variant="outline" className="text-xs">
                    Gate {item.details.gate}
                  </Badge>
                )}
                {item.details.roomType && (
                  <Badge variant="outline" className="text-xs">
                    {item.details.roomType}
                  </Badge>
                )}
                {item.details.duration && (
                  <Badge variant="outline" className="text-xs">
                    {item.details.duration}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
    </Card>
  )
}
