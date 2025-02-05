
import React from 'react';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { CaptionCard } from './caption/CaptionCard';

interface CaptionEditorProps {
  captions: string[];
  onSelect: (caption: string) => void;
  onEdit: (index: number, newCaption: string) => void;
  selectedCaption?: string;
  isLoading?: boolean;
}

export const CaptionEditor = ({
  captions,
  onSelect,
  onEdit,
  selectedCaption,
  isLoading
}: CaptionEditorProps) => {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>
    );
  }

  if (captions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          No captions generated yet. Please complete the previous steps.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {captions.map((caption, index) => (
        <CaptionCard
          key={index}
          caption={caption}
          index={index}
          onEdit={onEdit}
          onSelect={onSelect}
          isSelected={caption === selectedCaption}
        />
      ))}
    </div>
  );
};
