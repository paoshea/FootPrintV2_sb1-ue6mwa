import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import type { Memory } from '../../types';

interface MemoryImportProps {
  onImport: (memories: Partial<Memory>[]) => void;
  onError: (error: string) => void;
}

export function MemoryImport({ onImport, onError }: MemoryImportProps) {
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<Partial<Memory>[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    setImporting(true);
    try {
      const file = acceptedFiles[0];
      const text = await file.text();
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        throw new Error('Invalid file format. Expected an array of memories.');
      }

      const validMemories = data.filter((item) => {
        return (
          item.title &&
          item.content &&
          ['milestone', 'achievement', 'project', 'story'].includes(item.type)
        );
      });

      if (validMemories.length === 0) {
        throw new Error('No valid memories found in the file.');
      }

      setPreview(validMemories);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to parse import file');
      setPreview([]);
    } finally {
      setImporting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  const handleImport = () => {
    onImport(preview);
    setPreview([]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center mb-4">
        <Upload className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium">Import Memories</h3>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
        }`}
      >
        <input {...getInputProps()} />
        <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag & drop a JSON file here, or click to select'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Only .json files are supported
        </p>
      </div>

      {importing && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Importing memories...
        </div>
      )}

      {preview.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Preview ({preview.length} memories)
          </h4>
          <div className="max-h-64 overflow-y-auto border rounded-lg divide-y">
            {preview.map((memory, index) => (
              <div key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900">{memory.title}</h5>
                  <span className="text-xs text-gray-500">{memory.type}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {memory.content}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleImport}
              className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Import {preview.length} Memories
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <h4 className="font-medium mb-1">Import Format</h4>
            <p>The JSON file should contain an array of memories with the following structure:</p>
            <pre className="mt-2 bg-yellow-100 p-2 rounded text-xs overflow-x-auto">
{`[
  {
    "title": "Memory Title",
    "content": "Memory Content",
    "type": "milestone|achievement|project|story",
    "tags": ["tag1", "tag2"],
    "visibility": "private|team|company|public"
  }
]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}