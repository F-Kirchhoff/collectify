import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";
import useLocalStorageState from "use-local-storage-state";
import FavoriteSongs from "./pages/FavoriteSongs";

function App() {
  const [currentPage, setCurrentPage] = useState("HOME");
  const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState(
    "saved-album-ids",
    { defaultValue: [] }
  );

  const [favoriteSongIds, setFavoriteSongIds] = useLocalStorageState(
    "favorite-song-ids",
    { defaultValue: [] }
  );

  function handleToggleLikeSong(id) {
    if (favoriteSongIds.includes(id)) {
      setFavoriteSongIds(favoriteSongIds.filter((savedId) => savedId !== id));
    } else {
      setFavoriteSongIds([id, ...favoriteSongIds]);
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
    <>
      <h1>Collectify</h1>
      <main className="main">
        {currentPage === "HOME" && (
          <Home
            savedAlbumIds={savedAlbumIds}
            favoriteSongIds={favoriteSongIds}
            onToggleSave={handleToggleSave}
            onToggleLikeSong={handleToggleLikeSong}
          />
        )}
        {currentPage === "FAVORITES" && (
          <Favorites
            savedAlbumIds={savedAlbumIds}
            favoriteSongIds={favoriteSongIds}
            onToggleSave={handleToggleSave}
            onToggleLikeSong={handleToggleLikeSong}
          />
        )}
        {currentPage === "SONGS" && (
          <FavoriteSongs
            favoriteSongIds={favoriteSongIds}
            onToggleLikeSong={handleToggleLikeSong}
          />
        )}
      </main>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
