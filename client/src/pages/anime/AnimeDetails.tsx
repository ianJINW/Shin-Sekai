import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Button } from "../../components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const mockAnimeDetails = {
  "1": {
    id: "1",
    title: "Demon Slayer",
    description:
      "A young man fights demons to protect others and find a cure for his demon-turned sister.",
    cover:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1080",
    episodes: 26,
    rating: 4.8,
    genres: ["Action", "Fantasy", "Drama"],
  },
  "2": {
    id: "2",
    title: "Attack on Titan",
    description:
      "Humanity fights for survival against man-eating giants within enormous walls.",
    cover:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080",
    episodes: 87,
    rating: 4.9,
    genres: ["Action", "Drama", "Mystery"],
  },
};

export default function AnimeDetails() {
  const { animeId } = useParams();
  const anime = animeId
    ? mockAnimeDetails[animeId as keyof typeof mockAnimeDetails]
    : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (!anime) {
    return <div>Anime not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="container py-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-6">
          <div>
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
              <img
                src={anime.cover}
                alt={anime.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{anime.title}</h1>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-6 text-muted-foreground">{anime.description}</p>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {Array.from({ length: anime.episodes }, (_, i) => (
                  <Link
                    key={i}
                    to={`/anime/${anime.id}/episode/${i + 1}`}
                    className="hover:scale-105 transition-transform"
                  >
                    <Button variant="outline" className="w-full">
                      Episode {i + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
