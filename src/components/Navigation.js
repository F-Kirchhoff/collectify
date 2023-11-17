import "./Navigation.css";

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <button
        className={`navigation__button ${
          currentPage === "HOME" ? "navigation__button--active" : ""
        }`}
        onClick={() => setCurrentPage("HOME")}
      >
        Home
      </button>
      <button
        className={`navigation__button ${
          currentPage === "FAVORITES" ? "navigation__button--active" : ""
        }`}
        onClick={() => setCurrentPage("FAVORITES")}
      >
        Saved
      </button>
    </nav>
  );
}
