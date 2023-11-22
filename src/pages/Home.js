import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({ onToggleSave, savedAlbums }) {
  const [listTitle, setListTitle] = useState("Featured");
  const [albumData, setAlbumData] = useState([]);

  const albums = albumData.map((album) => {
    const isSaved = savedAlbums.some(
      (savedAlbum) => savedAlbum.id === album.id
    );
    return {
      ...album,
      isSaved,
    };
  });

  useEffect(() => {
    fetchAlbums("http://localhost:3000/api/featured");
  }, []);

  async function fetchAlbums(url) {
    try {
      const response = await fetch(url);
      const albums = await response.json();

      setAlbumData(albums);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(query) {
    await fetchAlbums(`http://localhost:3000/api/search?artist=${query}`);
    setListTitle(`Results for: ${query}`);
  }

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      <AlbumList list={albums} title={listTitle} onToggleSave={onToggleSave} />
    </>
  );
}
