import { useState } from "react";
import { MessageCircle, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Comment as CommentType, getUserById, formatDate } from "../../lib/data";
import { CommentReply } from "./CommentReply";

interface CommentProps {
  comment: CommentType;
  onReply: (parentId: string, content: string) => void;
}

export function Comment({ comment, onReply }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const user = getUserById(comment.userId);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className="mb-4 animate-fade-in">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar} alt={user?.displayName} />
          <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-medium text-sm">{user?.displayName}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
            <p className="text-sm whitespace-pre-line">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${
                  isLiked ? "fill-anime-accent text-anime-accent" : ""
                }`}
              />
              <span className="text-xs">{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
          </div>

          {isReplying && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}

          {comment.replies?.map((reply) => (
            <CommentReply key={reply.id} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  );
}
