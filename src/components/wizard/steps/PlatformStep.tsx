import React from 'react';
import { Button } from '../../ui/button';
import { Platform } from '@/types/post';
import { usePost } from '../../post/PostContext';

export const PlatformStep = () => {
  const { platform, setPlatform } = usePost();

  const handlePlatformSelect = (selectedPlatform: Platform) => {
    setPlatform(selectedPlatform);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          2
        </div>
        <h2 className="text-xl font-semibold">Choose Platform</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {(['Instagram', 'LinkedIn', 'Facebook', 'Twitter'] as Platform[]).map((p) => (
          <Button
            key={p}
            variant={platform === p ? "default" : "outline"}
            className="h-12"
            onClick={() => handlePlatformSelect(p)}
          >
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
};