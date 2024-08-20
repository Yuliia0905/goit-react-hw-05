import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.error}>Something went wrong! Please, reload the page!</p>
  );
};

export default ErrorMessage;
