import React from 'react';
import { Input } from '../../ui/input';
import { usePost } from '../../post/PostContext';

export const NicheStep = () => {
  const { niche, setNiche } = usePost();

  const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNiche(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          3
        </div>
        <h2 className="text-xl font-semibold">Industry/Niche</h2>
      </div>
      <Input
        placeholder="e.g., Fitness, Fashion, Technology"
        value={niche}
        onChange={handleNicheChange}
        className="h-12"
      />
    </div>
  );
};