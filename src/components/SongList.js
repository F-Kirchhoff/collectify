import "./SongList.css";

export default function SongList() {
  return (
    <ul className="songlist">
      {Array(10)
        .fill({ name: "test" })
        .map((song, index) => (
          <li key={song.name} className="songlist__song">
            <span>{index + 1}.</span>
            <span>{song.name}</span>
            <span>03:55</span>
          </li>
        ))}
    </ul>
  );
}
