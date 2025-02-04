import React from 'react';
import { Button } from '../../ui/button';
import { usePost } from '../../post/PostContext';
import { Tone } from '@/types/post';

export const ToneStep = () => {
  const { tone, setTone } = usePost();

  const handleToneSelect = (selectedTone: Tone) => {
    setTone(selectedTone);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          5
        </div>
        <h2 className="text-xl font-semibold">Select Tone</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {(['Professional', 'Casual', 'Humorous', 'Persuasive', 'Inspirational'] as Tone[]).map((t) => (
          <Button
            key={t}
            variant={tone === t ? "default" : "outline"}
            className="h-12"
            onClick={() => handleToneSelect(t)}
          >
            {t}
          </Button>
        ))}
      </div>
    </div>
  );
};