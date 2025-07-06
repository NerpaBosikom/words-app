import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 — Страница не найдена 😢</h1>
      <p>Кажется, вы не туда попали.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
