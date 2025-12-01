import { Link } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const mockAnimeList = [
  {
    id: "1",
    title: "Demon Slayer",
    cover:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1080",
    episodes: 26,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Attack on Titan",
    cover:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080",
    episodes: 87,
    rating: 4.9,
  },
];

export default function AnimeList() {
  return (
    <div>
      <Header />
      <main className="container py-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Anime List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAnimeList.map((anime) => (
            <Link
              key={anime.id}
              to={`/anime/${anime.id}`}
              className="hover:scale-[1.02] transition-transform"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{anime.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <img
                      src={anime.cover}
                      alt={anime.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                    <span>{anime.episodes} episodes</span>
                    <span>Rating: {anime.rating}/5</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
