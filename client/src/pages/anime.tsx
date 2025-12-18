import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInfo } from '../lib/apiRequests';

interface Genre {
  mal_id: number;
  type?: string | null;
  name: string;
  url?: string | null;
}

interface Studio {
  mal_id: number;
  type?: string | null;
  name: string;
  url?: string | null;
}

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime, isLoading, error } = useGetInfo(`/api/v1/anime/${id}`);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading…</p>
      </main>
    );
  }

  if (error || !anime?.data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">Error loading anime</p>
      </main>
    );
  }

  const { data } = anime;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {data.title_english || data.title}
        </h1>
        {data.title_japanese && (
          <p className="text-sm text-gray-500">{data.title_japanese}</p>
        )}
      </section>

      {/* Image + Basic Info */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <img
          className="w-64 h-auto rounded-lg shadow-md"
          src={data.images.jpg.large_image_url}
          alt={data.title}
        />

        <div className="flex flex-col gap-2 text-gray-700">
          <p className="text-base">
            <strong>Type:</strong> {data.type}
          </p>
          <p className="text-base">
            <strong>Episodes:</strong> {data.episodes || 'N/A'}
          </p>
          <p className="text-base">
            <strong>Duration:</strong> {data.duration || 'N/A'}
          </p>
          <p className="text-base">
            <strong>Status:</strong> {data.status}
          </p>
          <p className="text-base">
            <strong>Score:</strong> {data.score ?? '—'}
          </p>

          {data.aired?.string && (
            <p className="text-sm text-gray-500">
              <strong>Aired:</strong> {data.aired.string}
            </p>
          )}
        </div>

        <img
          className="w-64 h-auto rounded-lg shadow-md"
          src={data.images.webp.large_image_url}
          alt={data.title}
        />
      </section>

      {/* Synopsis */}
      {data.synopsis && (
        <section className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="mt-2 text-gray-700">{data.synopsis}</p>
        </section>
      )}

      {/* Genres + Studios + Source Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Genres */}
        {data.genres?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Genres</h3>
            <ul className="mt-1 flex flex-wrap gap-2">
              {data.genres.map((g: Genre) => (
                <li
                  key={g.mal_id}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {g.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Studios */}
        {data.studios?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Studios</h3>
            <ul className="mt-1 flex flex-wrap gap-2">
              {data.studios.map((s: Studio) => (
                <li
                  key={s.mal_id}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* External Link */}
      {data.url && (
        <section className="text-center">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View on MyAnimeList
          </a>
        </section>
      )}
    </main>
  );
};

export default Anime;
