import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({ albums, onSearch, query, handleToggleSave }) {
  return (
    <>
      <SearchForm onSubmit={onSearch} />
      <AlbumList
        list={albums}
        title={query === "" ? "Featured" : `Results for: ${query}`}
        onToggleSave={handleToggleSave}
      />
    </>
  );
}
