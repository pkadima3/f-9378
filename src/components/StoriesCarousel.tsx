import { useRef } from "react";
import { Story } from "./Story";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  { id: 1, imageUrl: "https://source.unsplash.com/photo-1649972904349-6e44c42644a7", username: "emma_dev", isViewed: false },
  { id: 2, imageUrl: "https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d", username: "tech_sarah", isViewed: true },
  { id: 3, imageUrl: "https://source.unsplash.com/photo-1581091226825-a6a2a5aee158", username: "alex.codes", isViewed: false },
  { id: 4, imageUrl: "https://source.unsplash.com/photo-1487058792275-0ad4aaf24ca7", username: "mark_dev", isViewed: false },
  { id: 5, imageUrl: "https://source.unsplash.com/photo-1498050108023-c5249f4df085", username: "julia.js", isViewed: true },
];

export function StoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story) => (
          <Story key={story.id} {...story} />
        ))}
      </div>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}