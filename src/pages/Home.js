import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({ onToggleSave, savedAlbums }) {
  const [pageState, setPageState] = useState("FEATURED");

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
    fetchAlbums(query, offset);
  }, [query, offset]);

  async function fetchAlbums(query, offset) {
    const url =
      pageState === "FEATURED"
        ? "http://localhost:3000/api/featured"
        : `http://localhost:3000/api/search?artist=${query}&offset=${offset}`;

    try {
      const response = await fetch(url);
      const albums = await response.json();
      setAlbumData([...albumData, ...albums]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(query) {
    setPageState("SEARCHED");
    setAlbumData([]);
    setOffset(0);
    setQuery(query);
  }

  async function handleFetchMoreResults() {
    setOffset(offset + 20);
  }

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      <AlbumList
        list={albums}
        title={pageState === "FEATURED" ? "Featured" : `Results for: ${query}`}
        onToggleSave={onToggleSave}
      />
      {pageState === "SEARCHED" && (
        <button className="button" onClick={handleFetchMoreResults}>
          more
        </button>
      )}
    </>
  );
}
