"use client";

import React, { useRef, useState } from 'react';
import { Upload, X, File, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  label?: string;
  description?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  value?: File[];
  variant?: 'dropzone' | 'button' | 'avatar';
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  error,
  accept,
  multiple = false,
  maxSize = 10,
  maxFiles = 5,
  onChange,
  value = [],
  variant = 'dropzone',
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const filesArray = Array.from(newFiles);
    
    // Validate file size
    const validFiles = filesArray.filter(file => {
      const sizeMB = file.size / (1024 * 1024);
      return sizeMB <= maxSize;
    });

    // Limit number of files
    const totalFiles = [...uploadedFiles, ...validFiles];
    const limitedFiles = totalFiles.slice(0, maxFiles);

    setUploadedFiles(limitedFiles);
    onChange?.(limitedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onChange?.(newFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="h-5 w-5" />;
    if (file.type.startsWith('text/')) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (variant === 'button') {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white">{label}</label>
        )}
        {description && (
          <p className="text-sm text-neutral-400">{description}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white",
            "hover:bg-neutral-700 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center gap-2"
          )}
        >
          <Upload className="h-4 w-4" />
          Choose Files
        </button>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-neutral-800 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-neutral-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white">{label}</label>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-neutral-800 border-2 border-neutral-700 overflow-hidden">
            {uploadedFiles[0] && uploadedFiles[0].type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(uploadedFiles[0])}
                alt="Avatar preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-neutral-500">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className={cn(
                "px-4 py-2 rounded-lg bg-blue-600 text-white text-sm",
                "hover:bg-blue-700 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Upload
            </button>
            {uploadedFiles[0] && (
              <button
                type="button"
                onClick={() => removeFile(0)}
                className="px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm hover:bg-neutral-700 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">{label}</label>
      )}
      {description && (
        <p className="text-sm text-neutral-400">{description}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          dragActive ? "border-blue-500 bg-blue-500/10" : "border-neutral-700 bg-neutral-900/50",
          "hover:border-neutral-600 hover:bg-neutral-900",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500"
        )}
      >
        <Upload className={cn(
          "mx-auto h-12 w-12 mb-4",
          dragActive ? "text-blue-500" : "text-neutral-400"
        )} />
        <p className="text-white font-medium mb-1">
          {dragActive ? "Drop files here" : "Click to upload or drag and drop"}
        </p>
        <p className="text-sm text-neutral-400">
          {accept || "Any file type"} up to {maxSize}MB
          {multiple && ` (max ${maxFiles} files)`}
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
              {file.type.startsWith('image/') ? (
                <div className="h-12 w-12 rounded overflow-hidden bg-neutral-800 flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  {getFileIcon(file)}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 hover:bg-neutral-800 rounded transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4 text-neutral-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
