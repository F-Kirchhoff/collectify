import "./SongList.css";

export default function SongList({ songs, favoriteSongIds, onToggleLikeSong }) {
  return (
    <ul className="songlist">
      {songs.map((song) => {
        const isLiked = favoriteSongIds.includes(song.id);
        return (
          <li key={song.id} className="songlist__song">
            <span>{song.track_number}.</span>
            <span>{song.name}</span>
            <span>{song.duration}</span>
            <button
              className={`songlist__like-button ${
                isLiked ? "songlist__like-button--active" : ""
              }`}
              onClick={() => onToggleLikeSong(song.id)}
            >
              {isLiked ? "-" : "+"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
