import "./AlbumCard.css";

export default function AlbumCard({ title, artist, image }) {
  return (
    <section className="album-card">
      <div className="album-card__info">
        <img src={image.url} alt={title} className="album-card__image" />
        <h2>{title}</h2>
        <small>{artist}</small>
      </div>
      <ul className="album-card__songlist">
        {Array(10)
          .fill({ name: "test" })
          .map((song, index) => (
            <li key={song.name} className="album-card__song">
              <span>{index + 1}.</span>
              <span>{song.name}</span>
              <span>03:55</span>
            </li>
          ))}
      </ul>
    </section>
  );
}
