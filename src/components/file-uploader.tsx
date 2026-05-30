"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useToast } from "@/components/ui/use-toast"

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "success" | "error"
  progress?: number
}

export function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const { toast } = useToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        status: "uploading" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])

      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Upload failed")
          }

          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, status: "success" as const } : f
            )
          )

          toast({
            title: "上传成功",
            description: `${file.name} 已成功上传并处理`,
          })
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              f.name === file.name ? { ...f, status: "error" as const } : f
            )
          )

          toast({
            title: "上传失败",
            description: `${file.name} 上传失败，请重试`,
            variant: "destructive",
          })
        }
      }
    },
    [toast]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/csv": [".csv"],
    },
    maxSize: 10 * 1024 * 1024,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-primary">拖放文件到此处</p>
        ) : (
          <p className="text-muted-foreground">
            拖放文件到此处，或点击选择文件
            <br />
            <span className="text-sm">支持 PDF、TXT、DOC、DOCX、CSV (最大 10MB)</span>
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-card"
            >
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
                {file.status === "success" && (
                  <span className="text-sm text-green-600">✓</span>
                )}
                {file.status === "error" && (
                  <span className="text-sm text-destructive">✗</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
