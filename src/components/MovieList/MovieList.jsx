import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li className={css.listItem} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              className={css.img}
            />
            <p className={css.text}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
