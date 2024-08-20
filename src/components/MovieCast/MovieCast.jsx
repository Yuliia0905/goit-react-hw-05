import { useEffect, useState } from "react";
import { getMovieCasts } from "../../services/movieSearchApi";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [casts, setCasts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCasts = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieCasts(movieId);
        setCasts(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCasts();
  }, [movieId]);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <h2>Cast</h2>
      <ul className={css.list}>
        {casts.map((cast) => (
          <li key={cast.id} className={css.item}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                  : defaultImg
              }
              alt={cast.name}
              className={css.img}
            />
            <p className={css.text}>{cast.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
