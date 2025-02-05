
import React from 'react';
import { Copy, Share2 } from 'lucide-react';
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
    <div className={`border rounded-lg p-4 mb-4 ${isSelected ? 'border-primary' : 'border-gray-200'}`}>
      <div 
        className="cursor-pointer"
        onClick={() => onSelect(caption)}
      >
        <p className="text-sm text-gray-900 mb-2">{caption}</p>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          <Copy className="h-3 w-3" />
          Copy
        </button>
        <button
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          <Share2 className="h-3 w-3" />
          Share
        </button>
      </div>
    </div>
  );
};
