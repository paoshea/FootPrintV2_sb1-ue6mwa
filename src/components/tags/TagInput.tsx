import React, { useState, useRef, useEffect } from 'react';
import { Tag as TagIcon, X, Plus } from 'lucide-react';
import { useTagStore } from '../../store/useTagStore';
import type { Tag, TagSuggestion } from '../../types/tag';

interface TagInputProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  context?: string;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  selectedTags,
  onTagsChange,
  context,
  placeholder = 'Add tags...',
  maxTags = 10,
}: TagInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<TagSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { tags, addTag, incrementTagUsage, getSuggestions } = useTagStore();

  useEffect(() => {
    if (input.trim()) {
      const newSuggestions = getSuggestions(input, context);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, context, getSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagSelect = (tag: Tag) => {
    if (selectedTags.length < maxTags && !selectedTags.find((t) => t.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
      incrementTagUsage(tag.id);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const handleCreateTag = () => {
    if (input.trim() && selectedTags.length < maxTags) {
      const existingTag = tags.find(
        (tag) => tag.name.toLowerCase() === input.toLowerCase()
      );

      if (existingTag) {
        handleTagSelect(existingTag);
      } else {
        const newTag = addTag({ name: input.trim() });
        handleTagSelect(newTag);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateTag();
    } else if (e.key === 'Backspace' && !input && selectedTags.length > 0) {
      onTagsChange(selectedTags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            <TagIcon className="h-3 w-3 mr-1" />
            {tag.name}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-1.5 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length < maxTags ? placeholder : `Maximum ${maxTags} tags`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          disabled={selectedTags.length >= maxTags}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
          >
            {suggestions.map(({ tag, reason }) => (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span className="flex items-center">
                  <TagIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {tag.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">{reason}</span>
              </button>
            ))}
            {input.trim() && !suggestions.find((s) => s.tag.name.toLowerCase() === input.toLowerCase()) && (
              <button
                onClick={handleCreateTag}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-indigo-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create "{input}"
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}