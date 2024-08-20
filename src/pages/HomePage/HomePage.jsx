import { useEffect, useState } from "react";
import { getPopularMovies } from "../../services/movieSearchApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Trending Movies</h1>
      {loading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
