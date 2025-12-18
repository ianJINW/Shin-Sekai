import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInfo } from '../lib/apiRequests';

interface MalEntity {
  mal_id: number;
  type?: string | null;
  name: string;
  url?: string | null;
}

interface AnimeData {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string;
  source: string;
  episodes: number;
  status: string;
  aired: { string: string };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  producers: MalEntity[];
  licensors: MalEntity[];
  studios: MalEntity[];
  genres: MalEntity[];
  themes: MalEntity[];
}

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime, isLoading, error } = useGetInfo<{ data: AnimeData }>(`/api/v1/anime/${id}`);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg animate-pulse text-gray-700">Loading…</p>
      </main>
    );
  }

  if (error || !anime?.data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Error loading anime</p>
      </main>
    );
  }

  const { data } = anime;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* — Title */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {data.title_english || data.title}
        </h1>
        {data.title_japanese && (
          <p className="text-sm text-gray-500">{data.title_japanese}</p>
        )}
      </section>

      {/* — Images + Basic Info */}
      <section className="flex flex-col sm:flex-row items-start gap-6">
        <img
          className="w-64 h-auto rounded-lg shadow-md"
          src={data.images.jpg.large_image_url}
          alt={data.title}
          loading="lazy"
        />
        <div className="space-y-2 text-gray-700">
          <p><strong>Type:</strong> {data.type}</p>
          <p><strong>Duration:</strong> {data.duration}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Source:</strong> {data.source}</p>
          <p><strong>Score:</strong> {data.score.toFixed(2)}</p>
          <p className="text-sm text-gray-500"><strong>Aired:</strong> {data.aired.string}</p>
        </div>
      </section>

      {/* — Synopsis */}
      {data.synopsis && (
        <section className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{data.synopsis}</p>
        </section>
      )}

      {/* — Meta Groups */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Genres */}
        {data.genres?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Genres</h3>
            <ul className="mt-1 flex flex-wrap gap-2 justify-center align-center">
              {data.genres.map((g) => (
                <li key={g.mal_id} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {g.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Themes */}
        {data.themes?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Themes</h3>
            <ul className="mt-1 flex flex-wrap gap-2 justify-center align-center">
              {data.themes.map((t) => (
                <li key={t.mal_id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* — Producers, Licensors, Studios */}
      <section className="space-y-4">
        {data.producers.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800">Producers</h3>
            <p className="text-gray-700">
              {data.producers.map((p) => p.name).join(', ')}
            </p>
          </div>
        )}
        {data.licensors.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800">Licensors</h3>
            <p className="text-gray-700">
              {data.licensors.map((l) => l.name).join(', ')}
            </p>
          </div>
        )}
        {data.studios.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800">Studios</h3>
            <p className="text-gray-700">
              {data.studios.map((s) => s.name).join(', ')}
            </p>
          </div>
        )}
      </section>

      {/* — Trailer (if exists) */}
      {data.trailer?.embed_url && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Trailer</h2>
          <div className="relative pt-[56.25%] w-full">
            <iframe
              src={data.trailer.embed_url}
              className="absolute inset-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${data.title} Trailer`}
            />
          </div>
        </section>
      )}

      {/* — External MAL Link */}
      <section className="text-center">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          View on MyAnimeList
        </a>
      </section>
    </main>
  );
};

export default Anime;
