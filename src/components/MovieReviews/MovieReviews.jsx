import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { MdStarRate } from "react-icons/md";

import Loader from "../Loader/Loader";

import css from "./MovieReviews.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMassage";
import { getMovieReviews } from "../../services/movieSearchApi";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data);
        console.log(data);

        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <h3 className={css.reviewTitle}>Reviews</h3>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <p className={css.text}>Author: {review.author_details.name}</p>
            <p className={css.text}>
              <MdStarRate /> {review.author_details.rating}
            </p>
            <p className={css.text}>{review.content}</p>
            <hr className={css.solidLine} />
          </li>
        ))}
        <hr className={css.solidLine} />
      </ul>
    </div>
  );
};

export default MovieReviews;
