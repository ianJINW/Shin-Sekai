import { type FC } from "react";
import { useGetInfo } from "../lib/apiRequests";
import { useNavigate } from "react-router-dom";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeListItem {
  mal_id: number;
  url: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  type?: string;
  episodes?: number | null;
  score?: number | null;
}

const Animes: FC = () => {
  const {
    data: animes,
    isLoading,
    error,
  } = useGetInfo("/api/v1/anime");

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading…
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-500">Error loading anime list</p>
      </main>
    );
  }

  if (!animes?.data || animes.data.length === 0) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-700">No anime found</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {animes.data.map((anime: AnimeListItem) => (
          <article
            key={anime.mal_id}
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
            className="cursor-pointer rounded-lg bg-white shadow hover:shadow-lg transition p-2"
          >
            <figure className="flex flex-col items-center text-center">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-auto rounded-md object-cover"
                loading="lazy"
              />
              <figcaption className="mt-2 font-semibold text-sm text-gray-800">
                {anime.title}
              </figcaption>
            </figure>
          </article>
        ))}
      </section>

      {/* Pagination info (optional) */}
      {animes.pagination && (
        <footer className="mt-6 text-center text-sm text-gray-600">
          <p>
            Page {animes.pagination.current_page} of{" "}
            {animes.pagination.last_visible_page}
          </p>
          {animes.pagination.has_next_page && (
            <p className="text-green-600">More pages available</p>
          )}
        </footer>
      )}
    </main>
  );
};

export default Animes;
