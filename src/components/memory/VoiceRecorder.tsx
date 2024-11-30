import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Mic, X } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onRecordingDelete: () => void;
  hasRecording: boolean;
}

export function VoiceRecorder({
  onRecordingComplete,
  onRecordingDelete,
  hasRecording,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      {!hasRecording ? (
        <div className="flex items-center space-x-2">
          <AudioRecorder
            onRecordingComplete={onRecordingComplete}
            onStartRecording={() => setIsRecording(true)}
            onStopRecording={() => setIsRecording(false)}
            classes={{
              AudioRecorderClass: 'flex items-center space-x-2',
              AudioRecorderStartSaveClass: 'btn-primary',
              AudioRecorderPauseResumeClass: 'btn-secondary',
              AudioRecorderDiscardClass: 'btn-secondary',
            }}
          />
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Recording...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Mic className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">Voice note recorded</span>
          </div>
          <button
            onClick={onRecordingDelete}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}