import { useState } from "react";
import { cn } from "@/lib/utils";

interface StoryProps {
  imageUrl: string;
  username: string;
  isViewed?: boolean;
}

export function Story({ imageUrl, username, isViewed = false }: StoryProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={cn(
        "p-[3px] rounded-full",
        isViewed ? "bg-gray-200" : "story-ring"
      )}>
        <div className="block rounded-full p-[2px] bg-white">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt={`${username}'s story`}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
        </div>
      </div>
      <span className="text-xs font-medium truncate w-20 text-center">
        {username}
      </span>
    </div>
  );
}