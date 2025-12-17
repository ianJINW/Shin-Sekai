import { type FC } from "react";
import { useGetInfo } from "../lib/apiRequests";
import { useNavigate } from "react-router-dom";

const Animes: FC = () => {
  const { data: animes, isLoading, error } = useGetInfo('/api/v1/anime');
  const navigate = useNavigate()

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error loading anime list</p>;
  if (!animes?.data) return <p>No anime found</p>;

  return (
    <main>
      <section className="anime-grid flex flex-row flex-wrap justify-center align-center gap-4">
        {animes.data.map((anime: any) => (
          <article key={anime.mal_id} onClick={() => navigate(`/anime/${anime.mal_id}`)} className="anime-card">
            <figure>

              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                loading="lazy"
              />
              <figcaption>
                {anime.title}
              </figcaption>
            </figure>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Animes;
