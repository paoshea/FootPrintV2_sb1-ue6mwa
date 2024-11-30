import React, { useState } from 'react';
import { Share2, Link, Mail, Download } from 'lucide-react';
import type { Memory } from '../../types';

interface TimelineShareProps {
  memories: Memory[];
  selectedYear: number;
}

export function TimelineShare({ memories, selectedYear }: TimelineShareProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/timeline/${selectedYear}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = `Company Timeline - ${selectedYear}`;
    const body = `Check out our company timeline for ${selectedYear}: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleExport = () => {
    const data = memories.map(memory => ({
      type: memory.type,
      title: memory.title,
      content: memory.content,
      date: new Date(memory.createdAt).toISOString(),
      tags: memory.tags,
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeline-${selectedYear}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Share2 className="h-5 w-5" />
        <span>Share Timeline</span>
      </button>

      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-4 space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <Link className="h-5 w-5 text-gray-500" />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleEmailShare}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <Mail className="h-5 w-5 text-gray-500" />
              <span>Share via Email</span>
            </button>

            <button
              onClick={handleExport}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <Download className="h-5 w-5 text-gray-500" />
              <span>Export Timeline</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}