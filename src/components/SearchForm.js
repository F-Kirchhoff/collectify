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
    <form onSubmit={handleSubmit} class="search-form">
      <input
        class="search-form__input"
        type="text"
        name="query"
        placeholder="Search for artists"
        aria-label="Search for artists"
      />
      <button type="submit" class="search-form__button">
        Find Albums
      </button>
    </form>
  );
}
