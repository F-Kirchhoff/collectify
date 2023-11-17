import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";

function App() {
  const [albumData, setAlbumData] = useState([]);
  const [savedAlbumData, setSavedAlbumData] = useState([]);
  const [query, setQuery] = useState("");

  const albums = albumData.map((album) => {
    const isSaved = savedAlbumData.some(
      (savedAlbum) => savedAlbum.id === album.id
    );
    return {
      ...album,
      isSaved,
    };
  });

  const savedAlbums = savedAlbumData.map((album) => {
    return {
      ...album,
      isSaved: true,
    };
  });

  useEffect(() => {
    fetchAlbums("http://localhost:3000/api/featured");
  }, []);

  async function fetchAlbums(url) {
    try {
      const response = await fetch(url);
      const albums = await response.json();

      setAlbumData(albums);
      setQuery(query);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleSave(album) {
    if (album.isSaved) {
      setSavedAlbumData(
        savedAlbumData.filter((savedAlbum) => savedAlbum.id !== album.id)
      );
    } else {
      setSavedAlbumData([album, ...savedAlbumData]);
    }
  }

  return (
    <main>
      <h1>Collectify</h1>
      <SearchForm
        onSubmit={(query) =>
          fetchAlbums(`http://localhost:3000/api/search?artist=${query}`)
        }
      />
      <AlbumList
        list={albums}
        title={query === "" ? "Featured" : `Results for: ${query}`}
        onToggleSave={handleToggleSave}
      />
      <AlbumList
        list={savedAlbums}
        title="Saved Albums"
        onToggleSave={handleToggleSave}
      />
    </main>
  );
}

export default App;
