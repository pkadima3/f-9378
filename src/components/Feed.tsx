import { useEffect, useState } from "react";
import { Post } from "./Post";

const POSTS_PER_PAGE = 5;

const initialPosts = [
  {
    id: 1,
    username: "emma_dev",
    avatarUrl: "https://source.unsplash.com/photo-1649972904349-6e44c42644a7",
    imageUrl: "https://source.unsplash.com/photo-1488590528505-98d2b5aba04b",
    caption: "Coding day! Working on some exciting new features.",
    likes: 234,
    comments: 12,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    username: "tech_sarah",
    avatarUrl: "https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    imageUrl: "https://source.unsplash.com/photo-1498050108023-c5249f4df085",
    caption: "Deep in thought about the next big project.",
    likes: 456,
    comments: 23,
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    username: "alex.codes",
    avatarUrl: "https://source.unsplash.com/photo-1581091226825-a6a2a5aee158",
    imageUrl: "https://source.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    caption: "Beautiful code is like poetry.",
    likes: 789,
    comments: 45,
    timestamp: "6 hours ago",
  },
];

export function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMorePosts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPosts = [...posts];
      for (let i = 0; i < POSTS_PER_PAGE; i++) {
        const originalPost = initialPosts[i % initialPosts.length];
        newPosts.push({
          ...originalPost,
          id: posts.length + i + 1,
        });
      }
      setPosts(newPosts);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000 &&
        !loading
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, posts]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}