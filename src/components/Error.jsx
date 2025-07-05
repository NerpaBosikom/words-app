const Error = ({ message }) => (
  <div className="error-box">
    ⚠️ Ошибка: {message || "Что-то пошло не так. Попробуйте снова."}
  </div>
);

export default Error;
