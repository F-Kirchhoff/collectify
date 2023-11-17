import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";

function App() {
  const [albums, setAlbums] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAlbums("");
  }, []);

  async function fetchAlbums(query) {
    const url =
      query === ""
        ? "http://localhost:3000/api/featured"
        : `http://localhost:3000/api/search?artist=${query}`;
    try {
      const response = await fetch(url);
      const albums = await response.json();
      setAlbums(albums);
      setQuery(query);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main class="main">
      <h1>Collectify</h1>
      <SearchForm onSubmit={fetchAlbums} />
      {query === "" ? (
        <AlbumList list={albums} title={"Featured"} />
      ) : (
        <>
          <button
            className="button button--secondary"
            onClick={() => fetchAlbums("")}
          >
            Show Featured Albums
          </button>
          <AlbumList list={albums} title={`Results for: ${query}`} />
        </>
      )}
    </main>
  );
}

export default App;
