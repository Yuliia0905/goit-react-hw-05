import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/movieSearchApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMassage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className={css.homePage}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <h1 className={css.title}>Trending Movies</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
