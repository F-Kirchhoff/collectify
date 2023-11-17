import "./SearchForm.css";

export default function SearchForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.query.value;

    if (query.trim() === "") {
      return;
    }

    onSubmit(query);
    event.target.reset();
  }
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        className="search-form__input"
        type="text"
        name="query"
        placeholder="Search for artists"
        aria-label="Search for artists"
      />
      <button type="submit" className="button">
        Find Albums
      </button>
    </form>
  );
}
