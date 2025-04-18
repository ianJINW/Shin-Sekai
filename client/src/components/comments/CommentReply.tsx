import { useState } from "react";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Comment, getUserById, formatDate } from "../../lib/data";

interface CommentReplyProps {
  reply: Comment;
}

export function CommentReply({ reply }: CommentReplyProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(reply.likes);

  const user = getUserById(reply.userId);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="ml-6 mt-3 animate-fade-in">
      <div className="flex gap-3">
        <Avatar className="h-6 w-6">
          <AvatarImage src={user?.avatar} alt={user?.displayName} />
          <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-medium text-sm">{user?.displayName}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(reply.createdAt)}
                </span>
              </div>
            </div>
            <p className="text-sm whitespace-pre-line">{reply.content}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 mt-1"
            onClick={handleLike}
          >
            <Heart
              className={`h-3 w-3 mr-1 ${
                isLiked ? "fill-anime-accent text-anime-accent" : ""
              }`}
            />
            <span className="text-xs">{likes}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
