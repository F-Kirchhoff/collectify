import { useEffect, useState } from "react";
import "./App.css";
import AlbumList from "./components/AlbumList";

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
    <main className="main">
      <h1>Collectify</h1>
      <AlbumList list={albums} />
    </main>
  );
}

export default App;
