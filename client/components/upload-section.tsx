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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFile: UploadedFile = {
        name: selectedFiles[0].name,
        size: formatFileSize(selectedFiles[0].size),
        status: "uploading",
      };
      setFiles((prev) => [...prev, newFile]);

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
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
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

        <Button className="w-full" size="lg">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Itinerary
        </Button>
      </CardContent>
    </Card>
  );
}
