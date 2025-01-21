import { useState } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostProps {
  username: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export function Post({
  username,
  avatarUrl,
  imageUrl,
  caption,
  likes,
  comments,
  timestamp,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="p-4 flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{username}</h3>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>

      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt="Post content"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center space-x-1 group"
          >
            <Heart
              className={cn(
                "w-6 h-6 transition-all",
                isLiked
                  ? "fill-red-500 stroke-red-500"
                  : "group-hover:text-gray-600"
              )}
            />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center space-x-1 group">
            <MessageCircle className="w-6 h-6 group-hover:text-gray-600" />
            <span className="text-sm">{comments}</span>
          </button>
          <button className="flex items-center space-x-1 group ml-auto">
            <Share className="w-6 h-6 group-hover:text-gray-600" />
          </button>
        </div>

        <p className="text-sm">
          <span className="font-semibold">{username}</span> {caption}
        </p>
      </div>
    </div>
  );
}