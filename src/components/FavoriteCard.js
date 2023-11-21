import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";

export default function FavoriteCard({ albumId, onToggleSave }) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchAlbum() {
      const response = await fetch(
        `http://localhost:3000/api/albums?id=${albumId}`
      );
      const data = await response.json();
      setAlbum(data);
    }
    fetchAlbum();
  }, [albumId]);

  if (!album) {
    return null;
  }

  return <AlbumCard {...album} isSaved={true} onToggleSave={onToggleSave} />;
}
