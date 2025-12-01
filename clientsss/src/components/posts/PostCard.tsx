import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Post, User, getUserById, formatDate } from "../../lib/data";
import { CommentSection } from "../../components/comments/CommentSection";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const user = getUserById(post.userId) as User;

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="anime-card mb-4 p-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
              <DropdownMenuItem>Follow @{user.username}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <p className="text-sm mb-3 whitespace-pre-line">{post.content}</p>

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.hashtags.map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="text-xs text-anime-primary hover:underline"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Images */}
        {post.images.length > 0 && (
          <div
            className={`overflow-hidden rounded-lg mb-3 ${
              post.images.length > 1 ? "grid grid-cols-2 gap-1" : ""
            }`}
          >
            {post.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Post by ${user.displayName}`}
                className="w-full h-auto object-cover max-h-96 hover:opacity-95 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        )}

        {/* Link Preview */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border rounded-lg overflow-hidden hover:bg-muted/50 transition-colors"
          >
            <div className="p-3">
              <p className="text-xs text-muted-foreground truncate">
                {post.link}
              </p>
              <p className="text-sm font-medium">View External Content</p>
            </div>
          </a>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-8"
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "fill-anime-accent text-anime-accent" : ""
              }`}
            />
            <span className="text-xs">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-8"
            onClick={() => setIsCommenting(!isCommenting)}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.comments}</span>
          </Button>

          <Button variant="ghost" size="sm" className="h-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="h-8" onClick={handleSave}>
          <Bookmark
            className={`h-4 w-4 ${
              isSaved ? "fill-anime-primary text-anime-primary" : ""
            }`}
          />
        </Button>
      </div>

      {/* Comments Section */}
      {isCommenting && (
        <div className="mt-4 border-t border-border pt-4">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
}
