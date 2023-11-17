import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";

function App() {
  console.clear();

  const [currentPage, setCurrentPage] = useState("HOME");
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

  function handleSearch(query) {
    fetchAlbums(`http://localhost:3000/api/search?artist=${query}`);
  }

  return (
    <>
      <h1>Collectify</h1>
      <main className="main">
        {currentPage === "HOME" && (
          <Home
            albums={albums}
            query={query}
            onToggleSave={handleToggleSave}
            onSearch={handleSearch}
          />
        )}
        {currentPage === "FAVORITES" && (
          <Favorites albums={savedAlbums} onToggleSave={handleToggleSave} />
        )}
      </main>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
