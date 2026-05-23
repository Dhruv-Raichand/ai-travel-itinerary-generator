"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plane, MapPin, Calendar, Clock } from "lucide-react"

const stats = [
  {
    label: "Total Trips",
    value: "12",
    change: "+2 this month",
    icon: Plane,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    label: "Destinations",
    value: "8",
    change: "3 countries",
    icon: MapPin,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    label: "Upcoming",
    value: "3",
    change: "Next: Jun 15",
    icon: Calendar,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    label: "Travel Days",
    value: "47",
    change: "This year",
    icon: Clock,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
