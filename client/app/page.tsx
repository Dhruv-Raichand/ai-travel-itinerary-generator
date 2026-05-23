"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { UploadSection } from "@/components/upload-section";
import { StatsCards } from "@/components/stats-cards";
import { TripOverview } from "@/components/trip-overview";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProtectedLayout from "@/components/auth/ProtectedRoute";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        <Sidebar
          isMobileOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Main content */}
        <main className="lg:pl-64 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-8">
            <div className="flex items-center gap-4 pl-12 lg:pl-0">
              <h1 className="text-xl font-semibold text-foreground">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search trips..."
                  className="w-64 pl-9 bg-secondary border-border"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="p-4 lg:p-8 space-y-8">
            {/* Welcome section */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">
                Welcome back, John
              </h2>
              <p className="text-muted-foreground">
                {"Here's what's happening with your travel plans."}
              </p>
            </div>

            {/* Stats */}
            <StatsCards />

            {/* Main grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Upload section */}
              <UploadSection />

              {/* Quick trip preview */}
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-card-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="secondary"
                      className="h-auto flex-col gap-2 py-4">
                      <span className="text-2xl">✈️</span>
                      <span className="text-sm">New Trip</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-auto flex-col gap-2 py-4">
                      <span className="text-2xl">📅</span>
                      <span className="text-sm">Calendar</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-auto flex-col gap-2 py-4">
                      <span className="text-2xl">🗺️</span>
                      <span className="text-sm">Explore</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-auto flex-col gap-2 py-4">
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm">Favorites</span>
                    </Button>
                  </div>
                </div>

                {/* Upcoming notification */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-lg">🎫</span>
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        Trip to Tokyo in 24 days
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Don&apos;t forget to check in for your flight 24 hours
                        before departure.
                      </p>
                      <Button
                        variant="link"
                        className="h-auto p-0 mt-2 text-primary">
                        View trip details →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip overview */}
            <TripOverview />
          </div>
        </main>
      </div>
    </ProtectedLayout>
  );
}
