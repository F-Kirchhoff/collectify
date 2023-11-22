import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";
import useLocalStorageState from "use-local-storage-state";

function App() {
  console.clear();

  const [currentPage, setCurrentPage] = useState("HOME");
  const [savedAlbumData, setSavedAlbumData] = useLocalStorageState(
    "saved-albums",
    { defaultValue: [] }
  );

  const savedAlbums = savedAlbumData.map((album) => {
    return {
      ...album,
      isSaved: true,
    };
  });

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
    <>
      <h1>Collectify</h1>
      <main className="main">
        {currentPage === "HOME" && (
          <Home onToggleSave={handleToggleSave} savedAlbums={savedAlbums} />
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
