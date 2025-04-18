import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

// Mock data for development
const mockPosts = [
  {
    id: "1",
    userId: "1",
    content:
      "Just finished watching the new episode of Demon Slayer! The animation was incredible! #DemonSlayer #anime",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1080",
    likes: 42,
    comments: 12,
    timestamp: "2025-04-17T14:53:00Z",
  },
  {
    id: "2",
    userId: "1",
    content:
      "Who else is excited for the new season of Attack on Titan? The last season was mind-blowing! #AttackOnTitan #anime",
    likes: 28,
    comments: 8,
    timestamp: "2025-04-16T10:30:00Z",
  },
  {
    id: "3",
    userId: "2",
    content:
      'Just discovered this hidden gem called "Violet Evergarden". The storytelling is beautiful! Highly recommend!',
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080",
    likes: 65,
    comments: 17,
    timestamp: "2025-04-15T20:15:00Z",
  },
];

interface PostsListProps {
  userId?: string;
}

export function PostsList({ userId }: PostsListProps) {
  // Filter posts by userId if provided
  const posts = userId
    ? mockPosts.filter((post) => post.userId === userId)
    : mockPosts;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="overflow-hidden animate-fade-in">
            <CardHeader className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2070&auto=format&fit=crop" />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Anime Enthusiast</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.timestamp)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <div className="relative aspect-video rounded-md overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="text-xs">Share</span>
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No posts to display.</p>
        </Card>
      )}
    </div>
  );
}
