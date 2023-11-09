import { useEffect, useState } from "react";
import "./App.css";
import AlbumCard from "./components/AlbumCard";
import { data } from "./db";

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/featured");
        const albums = await response.json();
        setAlbums(albums);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <main class="main">
      <h1>Collectify</h1>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            <AlbumCard {...album} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
