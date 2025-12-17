import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInfo } from '../lib/apiRequests';

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: anime, isLoading, error } = useGetInfo(`/api/v1/anime/${id}`);

  return (
  <main>
    {isLoading && <p>Loading…</p>}
    {error && <p>Error loading anime</p>}
    {anime && anime.data && (
      <>
        <h1>{anime.data.title_english || anime.data.title}</h1>

        <img
          src={anime.data.images.jpg.large_image_url}
          alt={anime.data.title}
          width={300}
        />
        
        <p><strong>Episodes:</strong> {anime.data.episodes}</p>
        <p><strong>Status:</strong> {anime.data.status}</p>
        <p><strong>Score:</strong> {anime.data.score}</p>

        <p>{anime.data.synopsis}</p>

        <h3>Genres</h3>
        <ul>
          {anime.data.genres.map((g:any) => (
            <li key={g.mal_id}>{g.name}</li>
          ))}
        </ul>
      </>
    )}
  </main>
)

}

export default Anime