import { useState } from "react";
import "./AlbumCard.css";
import SongList from "./SongList";

export default function AlbumCard({ title, artist, image }) {
  const [showSonglist, setShowSonglist] = useState(false);
  return (
    <section className="album-card">
      <button
        className="album-card__info"
        onClick={() => setShowSonglist(!showSonglist)}
      >
        <img src={image.url} alt={title} className="album-card__image" />
        <h2>{title}</h2>
        <small>{artist}</small>
      </button>
      {showSonglist && <SongList />}
    </section>
  );
}
