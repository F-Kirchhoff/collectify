import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";
import SearchForm from "./components/SearchForm";

function App() {
  const [albums, setAlbums] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [savedAlbumIds, setSavedAlbumIds] = useState([]);
  const [listTitle, setListTitle] = useState("Featured");

  useEffect(() => {
    fetchAlbums("http://localhost:3000/api/featured");
  }, []);

  useEffect(() => {
    getSavedAlbums();
  }, [savedAlbumIds]);

  async function fetchAlbums(url) {
    try {
      const response = await fetch(url);
      const albums = await response.json();

      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSavedAlbums() {
    if (savedAlbumIds.length === 0) {
      setSavedAlbums([]);
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/albums?ids=${JSON.stringify(savedAlbumIds)}`
    );
    const receivedAlbums = await response.json();
    setSavedAlbums(receivedAlbums);
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
      <AlbumList
        list={savedAlbums}
        title={"Favorites"}
        onToggleSave={handleToggleSave}
        savedAlbumIds={savedAlbumIds}
      />
    </main>
  );
}

export default App;
