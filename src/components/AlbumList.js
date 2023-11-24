import "./AlbumList.css";
import AlbumCard from "./AlbumCard";

export default function AlbumList({
  list,
  title,
  onToggleSave,
  savedAlbumIds,
  favoriteSongIds,
  onToggleLikeSong,
}) {
  if (list.length === 0) {
    return (
      <>
        <h2 className="album-list__title">{title}</h2>
        <small className="album-list__loading-info">no albums found</small>
      </>
    );
  }

  return (
    <>
      <h2 className="album-list__title">{title}</h2>
      <ul className="album-list">
        {list.map((album) => (
          <li key={album.id}>
            <AlbumCard
              {...album}
              onToggleSave={() => onToggleSave(album.id)}
              isSaved={savedAlbumIds.includes(album.id)}
              onToggleLikeSong={onToggleLikeSong}
              favoriteSongIds={favoriteSongIds}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
