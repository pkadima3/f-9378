import { StoriesCarousel } from "@/components/StoriesCarousel";
import { Feed } from "@/components/Feed";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="glass rounded-2xl p-4">
          <StoriesCarousel />
        </div>
        <Feed />
      </div>
    </div>
  );
};

export default Index;