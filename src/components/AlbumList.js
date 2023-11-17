import "./AlbumList.css";
import AlbumCard from "./AlbumCard";

export default function AlbumList({ list, title, onToggleSave }) {
  if (list.length === 0) {
    return (
      <>
        <h2>{title}</h2>
        <small className="album-list__loading-info">Loading Albums ...</small>
      </>
    );
  }

  return (
    <>
      <h2 className="album-list__title">{title}</h2>
      <ul className="album-list">
        {list.map((album) => (
          <li key={album.id}>
            <AlbumCard {...album} onToggleSave={() => onToggleSave(album)} />
          </li>
        ))}
      </ul>
    </>
  );
}
