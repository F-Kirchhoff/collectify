import AlbumList from "../components/AlbumList";

export default function Favorites({ albums, handleToggleSave }) {
  return (
    <AlbumList
      list={albums}
      title="Saved Albums"
      onToggleSave={handleToggleSave}
    />
  );
}
