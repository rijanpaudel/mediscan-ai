"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadAreaProps {
  onFileUpload: (file: File) => void
  disabled?: boolean
}

export function UploadArea({ onFileUpload, disabled }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) {
        setIsDragging(true)
      }
    },
    [disabled],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (disabled) return

      const files = Array.from(e.dataTransfer.files)
      const validFile = files.find((file) => file.type === "application/pdf" || file.type.startsWith("image/"))

      if (validFile) {
        onFileUpload(validFile)
      }
    },
    [onFileUpload, disabled],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  return (
    <Card>
      <CardContent className="p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input
            type="file"
            id="file-upload"
            className="sr-only"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            disabled={disabled}
          />

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <Upload className="size-8" />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">{isDragging ? "Drop your file here" : "Upload Medical Report"}</h3>

          <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
            Drag and drop your medical report here, or click to browse. Supports images (JPG, PNG) and PDF files.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImageIcon className="size-4" />
              <span>Images</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="size-4" />
              <span>PDF</span>
            </div>
          </div>

          <Button asChild disabled={disabled}>
            <label htmlFor="file-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
