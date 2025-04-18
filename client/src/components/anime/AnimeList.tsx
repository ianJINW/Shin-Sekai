import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

// Mock anime data
const animeDatabase = {
  "1": {
    id: "1",
    title: "Attack on Titan",
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080",
    genres: ["Action", "Drama", "Fantasy"],
    rating: 4.8,
    episodes: 87,
  },
  "2": {
    id: "2",
    title: "Demon Slayer",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1080",
    genres: ["Action", "Supernatural"],
    rating: 4.7,
    episodes: 44,
  },
  "3": {
    id: "3",
    title: "My Hero Academia",
    image:
      "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1080",
    genres: ["Action", "Superhero"],
    rating: 4.5,
    episodes: 113,
  },
  "4": {
    id: "4",
    title: "Violet Evergarden",
    image:
      "https://images.unsplash.com/photo-1606589156998-207bad7e4965?q=80&w=1080",
    genres: ["Drama", "Fantasy"],
    rating: 4.9,
    episodes: 13,
  },
  "5": {
    id: "5",
    title: "Jujutsu Kaisen",
    image:
      "https://images.unsplash.com/photo-1603585977493-37b7894dcc7f?q=80&w=1080",
    genres: ["Action", "Supernatural"],
    rating: 4.7,
    episodes: 34,
  },
};

interface AnimeListProps {
  animeIds?: string[];
  showAll?: boolean;
}

export function AnimeList({ animeIds, showAll = false }: AnimeListProps) {
  // If animeIds are provided, filter the database
  // Otherwise, show all if showAll is true
  const animeToShow = animeIds
    ? animeIds
        .map((id) => animeDatabase[id as keyof typeof animeDatabase])
        .filter(Boolean)
    : showAll
    ? Object.values(animeDatabase)
    : Object.values(animeDatabase).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {animeToShow.length > 0 ? (
        animeToShow.map((anime) => (
          <Link
            to={`/anime/${anime.id}`}
            key={anime.id}
            className="transition-transform hover:scale-[1.02]"
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm">{anime.rating}</span>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">
                  {anime.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 pt-0">
                <div className="flex flex-wrap gap-1">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 mt-auto flex justify-between text-sm text-muted-foreground">
                <span>{anime.episodes} episodes</span>
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center p-8">
          <p className="text-muted-foreground">No anime added yet.</p>
        </div>
      )}
    </div>
  );
}
