import { useState } from "react";
import { Image, Link as LinkIcon, Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { currentUser } from "../../lib/data";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to an API
    console.log("Submitting post:", content);
    setContent("");
    setIsExpanded(false);
  };

  return (
    <div className="anime-card p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage
              src={currentUser.avatar}
              alt={currentUser.displayName}
            />
            <AvatarFallback>{currentUser.displayName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="Share your anime thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              className="resize-none border-none bg-muted/30 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 min-h-[60px]"
            />

            {isExpanded && (
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                  >
                    <Image className="h-4 w-4" />
                    <span className="text-xs">Add Image</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-xs">Add Link</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                  >
                    <Hash className="h-4 w-4" />
                    <span className="text-xs">Add Tag</span>
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setContent("");
                      setIsExpanded(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-anime-primary hover:bg-anime-primary/90"
                    disabled={content.trim() === ""}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
