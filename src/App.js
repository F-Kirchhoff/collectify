import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";
import FavoriteCard from "./components/FavoriteCard";

function App() {
  const [albums, setAlbums] = useState([]);
  const [savedAlbumIds, setSavedAlbumIds] = useState([]);
  const [listTitle, setListTitle] = useState("Featured");

  useEffect(() => {
    fetchAlbums("http://localhost:3000/api/featured");
  }, []);

  async function fetchAlbums(url) {
    try {
      const response = await fetch(url);
      const albums = await response.json();

      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleSave(id) {
    if (savedAlbumIds.includes(id)) {
      setSavedAlbumIds(savedAlbumIds.filter((savedId) => savedId !== id));
    } else {
      setSavedAlbumIds([id, ...savedAlbumIds]);
    }
  }

  return (
    <main>
      <h1>Collectify</h1>
      <SearchForm
        onSubmit={(query) => {
          fetchAlbums(`http://localhost:3000/api/search?artist=${query}`);
          setListTitle(`Results for: ${query}`);
        }}
      />
      <AlbumList
        list={albums}
        title={listTitle}
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
