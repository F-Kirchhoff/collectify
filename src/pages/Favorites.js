import AlbumList from "../components/AlbumList";

export default function Favorites({ albums, onToggleSave }) {
  return (
    <AlbumList list={albums} title="Saved Albums" onToggleSave={onToggleSave} />
  );
}
