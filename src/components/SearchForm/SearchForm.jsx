import { FaSearch } from "react-icons/fa";
import css from "./SearchForm.module.css";
import { VscEdit } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";

const SearchForm = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.searchInput.value.trim();
    if (query === "") {
      toast("Please enter the name of the movie to search", {
        icon: <VscEdit style={{ color: "red" }} />,
      });
      return;
    }
    onSearch(query, 1);
    form.reset();
  };
  return (
    <div>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          //   onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
          name="searchInput"
          autoComplete="off"
          autoFocus
        />
        <button type="submit" className={css.btn}>
          <FaSearch size="26" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
