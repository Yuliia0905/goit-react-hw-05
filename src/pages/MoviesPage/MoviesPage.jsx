import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";

import { getMoviesByQuery } from "../../services/movieSearchApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import SearchForm from "../../components/SearchForm/SearchForm";

const MoviesPage = () => {
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    setShowBtn(false);
    setLoading(true);
    setError(false);

    const fetchMoviesByQuery = async () => {
      try {
        const data = await getMoviesByQuery(query, page);
        if (data.results.length === 0) {
          toast("No matches found. Please check your query.", {
            icon: <TbFaceIdError size="26" style={{ color: "red" }} />,
          });
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
        setShowBtn(page < data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByQuery();
  }, [query, page]);

  const onSearch = (searchTerm) => {
    setSearchParams({
      query: searchTerm,
    });

    setPage(1);
    setMovies([]);
  };

  const handleLoadMoreBtn = () => {
    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (scrollPosition !== 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [movies, scrollPosition]);

  return (
    <div className={css.moviesPage}>
      <Toaster position="top-right" />
      <SearchForm defaultSearchValue={query} onSearch={onSearch} />
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
      {showBtn && <LoadMoreBtn onClick={handleLoadMoreBtn} />}
    </div>
  );
};

export default MoviesPage;
