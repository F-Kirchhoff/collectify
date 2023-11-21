import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";
import FavoriteCard from "./components/FavoriteCard";

function App() {
  const [albums, setAlbumData] = useState([]);
  const [savedAlbumIds, setSavedAlbumData] = useState([]);
  const [query, setQuery] = useState("");

  console.log({ savedAlbumIds });

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

  function handleToggleSave(id) {
    if (savedAlbumIds.includes(id)) {
      setSavedAlbumData(savedAlbumIds.filter((savedId) => savedId !== id));
    } else {
      setSavedAlbumData([id, ...savedAlbumIds]);
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
        savedAlbumIds={savedAlbumIds}
      />
      <h2>Favorites</h2>
      {savedAlbumIds.map((id) => (
        <FavoriteCard
          key={id}
          albumId={id}
          onToggleSave={() => handleToggleSave(id)}
        />
      ))}
    </main>
  );
}

export default App;
