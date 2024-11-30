import React, { useState } from 'react';
import { Download, FileText, Image, File } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Memory } from '../../types';

interface TimelineExportProps {
  memories: Memory[];
  selectedYear: number;
}

export function TimelineExport({ memories, selectedYear }: TimelineExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToJSON = () => {
    const data = memories.map(memory => ({
      type: memory.type,
      title: memory.title,
      content: memory.content,
      date: new Date(memory.createdAt).toISOString(),
      tags: memory.tags,
      visibility: memory.visibility,
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

  const exportToCSV = () => {
    const headers = ['Type', 'Title', 'Content', 'Date', 'Tags', 'Visibility'];
    const rows = memories.map(memory => [
      memory.type,
      `"${memory.title.replace(/"/g, '""')}"`,
      `"${memory.content.replace(/"/g, '""')}"`,
      new Date(memory.createdAt).toISOString(),
      `"${memory.tags.join(', ')}"`,
      memory.visibility,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeline-${selectedYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const timelineElement = document.getElementById('timeline-container');
      if (!timelineElement) return;

      const canvas = await html2canvas(timelineElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`timeline-${selectedYear}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToImage = async () => {
    setIsExporting(true);
    try {
      const timelineElement = document.getElementById('timeline-container');
      if (!timelineElement) return;

      const canvas = await html2canvas(timelineElement);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `timeline-${selectedYear}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting to image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <button
          onClick={exportToJSON}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <FileText className="h-4 w-4" />
          <span>JSON</span>
        </button>

        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <File className="h-4 w-4" />
          <span>CSV</span>
        </button>

        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>PDF</span>
        </button>

        <button
          onClick={exportToImage}
          disabled={isExporting}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          <Image className="h-4 w-4" />
          <span>Image</span>
        </button>
      </div>

      {isExporting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-sm text-gray-500">Exporting...</div>
        </div>
      )}
    </div>
  );
}