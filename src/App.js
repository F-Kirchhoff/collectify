import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";

function App() {
  const [currentPage, setCurrentPage] = useState("HOME");
  const [savedAlbumIds, setSavedAlbumIds] = useState([]);

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
      {currentPage === "HOME" && (
        <Home savedAlbumIds={savedAlbumIds} onToggleSave={handleToggleSave} />
      )}
      {currentPage === "FAVORITES" && (
        <Favorites
          savedAlbumIds={savedAlbumIds}
          onToggleSave={handleToggleSave}
        />
      )}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}

export default App;
