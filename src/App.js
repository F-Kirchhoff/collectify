import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [currentPage, setCurrentPage] = useState("HOME");
  const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState(
    "saved-album-ids",
    { defaultValue: [] }
  );

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
          <Home savedAlbumIds={savedAlbumIds} onToggleSave={handleToggleSave} />
        )}
        {currentPage === "FAVORITES" && (
          <Favorites
            savedAlbumIds={savedAlbumIds}
            onToggleSave={handleToggleSave}
          />
        )}
      </main>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
