"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X, Sparkles, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: string;
  status: "uploading" | "processing" | "complete";
}

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [bookingText, setBookingText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const newFile: UploadedFile = {
        name: droppedFiles[0].name,
        size: formatFileSize(droppedFiles[0].size),
        status: "uploading",
      };
      setFiles((prev) => [...prev, newFile]);

      // Simulate upload and processing
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.name === newFile.name ? { ...f, status: "processing" } : f,
          ),
        );
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.name === newFile.name ? { ...f, status: "complete" } : f,
            ),
          );
        }, 2000);
      }, 1500);
    }
  }, []);

  // const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = e.target.files;
  //   if (selectedFiles && selectedFiles.length > 0) {
  //     const newFile: UploadedFile = {
  //       name: selectedFiles[0].name,
  //       size: formatFileSize(selectedFiles[0].size),
  //       status: "uploading",
  //     };
  //     setFiles((prev) => [...prev, newFile]);

  //     setTimeout(() => {
  //       setFiles((prev) =>
  //         prev.map((f) =>
  //           f.name === newFile.name ? { ...f, status: "processing" } : f,
  //         ),
  //       );
  //       setTimeout(() => {
  //         setFiles((prev) =>
  //           prev.map((f) =>
  //             f.name === newFile.name ? { ...f, status: "complete" } : f,
  //           ),
  //         );
  //       }, 2000);
  //     }, 1500);
  //   }
  // };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert("File uploaded. Please verify or edit extracted text below.");

    const file = e.target.files?.[0];
    if (!file) return;

    setBookingText(`Sample booking from file: ${file.name}`);
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleGenerate = async () => {
    try {
      if (!bookingText.trim()) {
        alert("Please paste booking text first");
        return;
      }

      setLoading;

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/itineraries/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingText,
          }),
        },
      );

      const data = await res.json();

      const itinerary = data?.data?.itinerary;

      if (!itinerary) {
        alert(data?.message || "Failed to generate itinerary");
        return;
      }

      setGeneratedItinerary(itinerary);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Sparkles className="h-5 w-5 text-primary" />
          Upload Booking Documents
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload your flight tickets, hotel confirmations, or travel documents.
          Our AI will automatically generate your itinerary.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex min-h-50 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
            isDragging ?
              "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 hover:bg-secondary/50",
          )}>
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">
                Drop your files here or{" "}
                <span className="text-primary">browse</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                PDF, DOC, DOCX, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "uploading" && (
                    <span className="text-xs text-muted-foreground">
                      Uploading...
                    </span>
                  )}
                  {file.status === "processing" && (
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Sparkles className="h-3 w-3 animate-pulse" />
                      Processing with AI...
                    </span>
                  )}
                  {file.status === "complete" && (
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <Check className="h-3 w-3" />
                      Complete
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFile(file.name)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <textarea
          className="w-full min-h-30 rounded-lg border border-border bg-background p-3 text-sm"
          placeholder="Paste booking details here..."
          value={bookingText}
          onChange={(e) => {
            console.log(e.target.value);
            setBookingText(e.target.value);
          }}
        />

        <Button
          className="w-full"
          size="lg"
          onClick={handleGenerate}
          disabled={loading}>
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Generate Itinerary"}
        </Button>
        {generatedItinerary && (
          <div className="rounded-xl border border-border p-4 space-y-4">
            <h3 className="text-lg font-semibold">
              {generatedItinerary.tripSummary?.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              Destination: {generatedItinerary.tripSummary?.destination}
            </p>

            <p className="text-sm">
              {generatedItinerary.tripSummary?.overview}
            </p>

            <div>
              <h4 className="font-medium mb-2">Flights</h4>

              {generatedItinerary.flights?.map((flight: any, idx: number) => (
                <div key={idx} className="rounded-lg bg-secondary p-3 mb-2">
                  <p>
                    {flight.airline} ({flight.flightNumber})
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {flight.from} → {flight.to}
                  </p>
                </div>
              ))}
              {generatedItinerary.hotels?.map((hotel: any, idx: number) => (
                <div key={idx} className="rounded-lg bg-secondary p-3 mb-2">
                  <p className="font-medium">{hotel.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {hotel.location}
                  </p>
                  <p className="text-xs">
                    {hotel.checkIn} → {hotel.checkOut}
                  </p>
                </div>
              ))}
              {generatedItinerary.dayWiseItinerary?.map(
                (day: any, idx: number) => (
                  <div key={idx} className="rounded-lg bg-secondary p-3 mb-2">
                    <p className="font-medium">
                      Day {day.day}: {day.title}
                    </p>
                    <ul className="list-disc ml-5 text-sm text-muted-foreground">
                      {day.activities?.map((act: string, i: number) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
              {generatedItinerary.recommendations?.map(
                (rec: any, idx: number) => (
                  <div key={idx} className="rounded-lg bg-secondary p-3 mb-2">
                    <p className="font-medium">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {rec.category}
                    </p>
                    <p className="text-sm">{rec.description}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
