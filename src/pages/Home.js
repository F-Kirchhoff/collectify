import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({ onToggleSave, savedAlbums }) {
  const [listTitle, setListTitle] = useState("Featured");
  const [albumData, setAlbumData] = useState([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);

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
    async function fetchFeaturedAlbums() {
      const albums = await fetchAlbums("http://localhost:3000/api/featured");
      setAlbumData(albums);
    }
    fetchFeaturedAlbums();
  }, []);

  async function fetchAlbums(url) {
    try {
      const response = await fetch(url);
      const albums = await response.json();
      return albums;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(query) {
    const albums = await fetchAlbums(
      `http://localhost:3000/api/search?artist=${query}&offset=0`
    );
    setAlbumData(albums);
    setQuery(query);
    setListTitle(`Results for: ${query}`);
    setOffset(0);
  }

  async function handleFetchMoreResults() {
    const newOffset = offset + 20;
    const nextAlbums = await fetchAlbums(
      `http://localhost:3000/api/search?artist=${query}&offset=${newOffset}`
    );
    console.log(nextAlbums);
    setAlbumData([...albumData, ...nextAlbums]);
    setOffset(newOffset);
  }

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      <AlbumList list={albums} title={listTitle} onToggleSave={onToggleSave} />
      {query !== "" && (
        <button className="button" onClick={handleFetchMoreResults}>
          more
        </button>
      )}
    </>
  );
}
