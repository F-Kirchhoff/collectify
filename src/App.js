import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";

function App() {
  const [albums, setAlbums] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAlbums("");
  }, []);

  useEffect(() => {
    const albumsWithSavedState = albums.map((album) => {
      const isSaved = savedAlbums.some(
        (savedAlbum) => savedAlbum.id === album.id
      );
      return {
        ...album,
        isSaved,
      };
    });

    setAlbums(albumsWithSavedState);
  }, [savedAlbums]);

  async function fetchAlbums(query) {
    const url =
      query === ""
        ? "http://localhost:3000/api/featured"
        : `http://localhost:3000/api/search?artist=${query}`;
    try {
      const response = await fetch(url);
      const albums = await response.json();

      const albumsWithSavedState = albums.map((album) => {
        const isSaved = savedAlbums.some(
          (savedAlbum) => savedAlbum.id === album.id
        );
        return {
          ...album,
          isSaved,
        };
      });

      setAlbums(albumsWithSavedState);
      setQuery(query);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleSave(album) {
    if (album.isSaved) {
      setSavedAlbums(
        savedAlbums.filter((savedAlbum) => savedAlbum.id !== album.id)
      );
    } else {
      setSavedAlbums([{ ...album, isSaved: true }, ...savedAlbums]);
    }
  }

  return (
    <main class="main">
      <h1>Collectify</h1>
      <SearchForm onSubmit={fetchAlbums} />
      {query === "" ? (
        <AlbumList
          list={albums}
          title={"Featured"}
          onToggleSave={handleToggleSave}
        />
      ) : (
        <>
          <button
            className="button button--secondary"
            onClick={() => fetchAlbums("")}
          >
            Show Featured Albums
          </button>
          <AlbumList
            list={albums}
            title={`Results for: ${query}`}
            onToggleSave={handleToggleSave}
          />
        </>
      )}
      <AlbumList
        list={savedAlbums}
        title="Saved Albums"
        onToggleSave={handleToggleSave}
      />
    </main>
  );
}

export default App;
