import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { CommentSection } from "../../components/comments/CommentSection";
import { Button } from "../../components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function EpisodeWatch() {
  const { animeId, episodeNumber } = useParams();
  const [isRecommending, setIsRecommending] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleRecommend = () => {
    setIsRecommending(true);
    // In a real app, this would open a modal or dialogue to select friends
    toast.success("Recommendation sent!");
    setIsRecommending(false);
  };

  return (
    <div>
      <Header />
      <main className="container py-6 animate-fade-in">
        <div className="space-y-6">
          <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white/60">
              Video player would go here
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Episode {episodeNumber}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRecommend}
                disabled={isRecommending}
              >
                Recommend to Friends
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Episode Comments</h2>
            <CommentSection postId={`${animeId}-${episodeNumber}`} />
          </div>
        </div>
      </main>
    </div>
  );
}
