import "./App.css";
import AlbumCard from "./components/AlbumCard";
import { data } from "./db";

function App() {
  return (
    <main className="main">
      <h1>Collectify</h1>
      <ul className="album-list">
        {data.map((album) => (
          <li key={album.id}>
            <AlbumCard {...album} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
