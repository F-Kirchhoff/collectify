import "./AlbumCard.css";

export default function AlbumCard({ title, artist, image }) {
  return (
    <section className="album-card">
      <img src={image.url} alt={title} className="album-card__image" />
      <div className="album-card__info">
        <h2>{title}</h2>
        <small>{artist}</small>
      </div>
    </section>
  );
}
