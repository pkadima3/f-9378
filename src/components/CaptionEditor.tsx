
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
  // Combine captions and selectedCaption, ensuring no duplicates
  const displayCaptions = React.useMemo(() => {
    const allCaptions = new Set(captions);
    if (selectedCaption && !captions.includes(selectedCaption)) {
      allCaptions.add(selectedCaption);
    }
    return Array.from(allCaptions);
  }, [captions, selectedCaption]);

  if (isLoading) {
    return (
      <Card className="p-6 animate-fade-in">
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Generated Captions</h3>
      <div className="space-y-6">
        {displayCaptions.map((caption, index) => (
          <CaptionCard
            key={index}
            caption={caption}
            index={index}
            onEdit={onEdit}
            onSelect={onSelect}
            isSelected={caption === selectedCaption}
          />
        ))}
        {displayCaptions.length === 0 && (
          <p className="text-center text-muted-foreground">
            No captions generated yet. Please complete the previous steps.
          </p>
        )}
      </div>
    </Card>
  );
};
