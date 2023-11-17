import { useEffect, useState } from "react";
import "./App.css";
import AlbumCard from "./components/AlbumCard";
import SearchForm from "./components/SearchForm";

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

  async function fetchAlbums(query) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/search?artist=${query}`
      );
      const albums = await response.json();
      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main class="main">
      <h1>Collectify</h1>
      <SearchForm onSubmit={fetchAlbums} />
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
