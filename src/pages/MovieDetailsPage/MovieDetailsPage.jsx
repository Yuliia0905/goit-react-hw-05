import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMoviesDetails } from "../../services/movieSearchApi";

import ErrorMessage from "../../components/ErrorMessage/ErrorMassage";
import Loader from "../../components/Loader/Loader";

import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getMoviesDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesDetails();
  }, [movieId]);

  if (!movie) return;

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div className={css.container}>
      <Link className={css.backLink} to={backLink.current}>
        ← Go back
      </Link>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <div className={css.wrapper}>
        <img
          className={css.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />

        <div className={css.wrapperText}>
          <h2 className={css.title}>{movie.title}</h2>
          <p>{movie.overview}</p>
          <hr className={css.solidLine} />
          <h3>Genres:</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          <h3>Release date:</h3>
          <p>{movie.release_date}</p>
          <h3>Rate:</h3>
          <p>{movie.vote_average}</p>
        </div>
      </div>

      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="cast"
        >
          Cast
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(css.link, isActive && css.active)}
          to="reviews"
        >
          Reviwes
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
export default MovieDetailsPage;
