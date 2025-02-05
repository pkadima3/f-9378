
import React from 'react';
import { Card } from './ui/card';
import { RadioGroup } from './ui/radio-group';
import { Skeleton } from './ui/skeleton';
import { CaptionOption } from './caption/CaptionOption';
import { Share2, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

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
  const handleCopy = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied to clipboard",
      description: "The caption has been copied to your clipboard.",
    });
  };

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

  if (!captions || captions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          No captions generated yet. Please complete the previous steps.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <RadioGroup
        value={selectedCaption}
        onValueChange={onSelect}
        className="space-y-6"
      >
        {captions.map((caption, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 hover:border-primary transition-colors">
            <CaptionOption
              index={index}
              caption={caption}
              onEdit={(newCaption) => onEdit(index, newCaption)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(caption)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};
