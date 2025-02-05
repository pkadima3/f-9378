
import React from 'react';
import { Share2, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { CaptionOption } from './CaptionOption';
import { toast } from '../ui/use-toast';

interface CaptionCardProps {
  caption: string;
  index: number;
  onEdit: (index: number, newCaption: string) => void;
  onSelect: (caption: string) => void;
  isSelected: boolean;
}

export const CaptionCard = ({
  caption,
  index,
  onEdit,
  onSelect,
  isSelected
}: CaptionCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied to clipboard",
      description: "The caption has been copied to your clipboard.",
    });
  };

  return (
    <div className={`border rounded-lg p-4 space-y-3 transition-colors ${isSelected ? 'border-primary' : 'hover:border-primary'}`}>
      <CaptionOption
        index={index}
        caption={caption}
        onEdit={(newCaption) => onEdit(index, newCaption)}
        onSelect={() => onSelect(caption)}
        isSelected={isSelected}
      />
      <div className="flex justify-end gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
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
  );
};
