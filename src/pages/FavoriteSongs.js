import { useEffect, useState } from "react";
import SongList from "../components/SongList";

export default function FavoriteSongs({ favoriteSongIds, onToggleLikeSong }) {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      const response = await fetch(
        `http://localhost:3000/api/tracks?ids=${JSON.stringify(
          favoriteSongIds
        )}`
      );
      const data = await response.json();
      setFavoriteSongs(data);
    }
    fetchSongs();
  }, [favoriteSongIds]);

  return (
    <>
      <h2>Favorite Songs</h2>
      <SongList
        songs={favoriteSongs}
        favoriteSongIds={favoriteSongIds}
        onToggleLikeSong={onToggleLikeSong}
      />
    </>
  );
}
