import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";

export default function Favorites({ savedAlbumIds, onToggleSave }) {
  const [savedAlbums, setSavedAlbums] = useState([]);

  useEffect(() => {
    getSavedAlbums();
  }, [savedAlbumIds]);

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
  return (
    <AlbumList
      list={savedAlbums}
      title={"Favorites"}
      onToggleSave={onToggleSave}
      savedAlbumIds={savedAlbumIds}
    />
  );
}
