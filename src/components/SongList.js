import "./SongList.css";

export default function SongList({ songs }) {
  return (
    <ul className="songlist">
      {songs.map((song) => (
        <li key={song.id} className="songlist__song">
          <span>{song.track_number}.</span>
          <span>{song.name}</span>
          <span>{song.duration}</span>
        </li>
      ))}
    </ul>
  );
}
