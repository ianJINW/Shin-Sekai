import { useState } from "react";
import { Comment as CommentType, getCommentsByPostId } from "../../lib/data";
import { Comment } from "./Comment";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(
    getCommentsByPostId(postId)
  );
  const [newComment, setNewComment] = useState("");

  const handleNewComment = () => {
    if (newComment.trim()) {
      const comment: CommentType = {
        id: `temp-${Date.now()}`,
        postId,
        userId: "1", // Using current user ID
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      setComments((prev) => [comment, ...prev]);
      setNewComment("");
    }
  };

  const handleReply = (parentId: string, content: string) => {
    const reply: CommentType = {
      id: `temp-${Date.now()}`,
      postId,
      userId: "1", // Using current user ID
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button onClick={handleNewComment} disabled={!newComment.trim()}>
            Comment
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}
