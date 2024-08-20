import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { IoSadOutline } from "react-icons/io5";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <IoSadOutline
        size={100}
        style={{ color: "rgba(255, 255, 255, 0.714)" }}
      />
      <h2 className={css.title}>Page not found </h2>
      <Link className={css.link} to="/">
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
