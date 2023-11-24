import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({
  onToggleSave,
  savedAlbumIds,
  onToggleLikeSong,
  favoriteSongIds,
}) {
  const [pageState, setPageState] = useState("FEATURED");

  const [albums, setAlbums] = useState([]);

  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);

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
      const nextAlbums = await response.json();
      setAlbums([...albums, ...nextAlbums]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(query) {
    setPageState("SEARCHED");
    setAlbums([]);
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
        savedAlbumIds={savedAlbumIds}
        onToggleLikeSong={onToggleLikeSong}
        favoriteSongIds={favoriteSongIds}
      />
      {pageState === "SEARCHED" && (
        <button className="button" onClick={handleFetchMoreResults}>
          more
        </button>
      )}
    </>
  );
}
