import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, FileText, Film } from 'lucide-react';
import { clsx } from 'clsx';

interface MediaUploadProps {
  files: File[];
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  maxFiles?: number;
  maxSize?: number;
}

export function MediaUpload({
  files,
  onFilesAdded,
  onFileRemove,
  maxFiles = 5,
  maxSize = 10485760, // 10MB
}: MediaUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = maxFiles - files.length;
      const newFiles = acceptedFiles.slice(0, remainingSlots);
      onFilesAdded(newFiles);
    },
    [files.length, maxFiles, onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf'],
    },
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (file.type.startsWith('video/')) return <Film className="h-6 w-6" />;
    return <FileText className="h-6 w-6" />;
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="h-full w-full object-cover rounded-lg"
        />
      );
    }
    return getFileIcon(file);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          {
            'border-indigo-300 bg-indigo-50': isDragActive,
            'border-gray-300 hover:border-indigo-300': !isDragActive,
            'opacity-50 cursor-not-allowed': files.length >= maxFiles,
          }
        )}
      >
        <input {...getInputProps()} disabled={files.length >= maxFiles} />
        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? 'Drop files here...'
            : `Drag & drop files here, or click to select`}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Max {maxFiles} files, up to {maxSize / 1048576}MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group border rounded-lg p-2 bg-gray-50"
            >
              <div className="aspect-square flex items-center justify-center">
                {getFilePreview(file)}
              </div>
              <button
                onClick={() => onFileRemove(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-1 text-xs text-gray-500 truncate text-center">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}