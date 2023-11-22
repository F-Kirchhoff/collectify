import { useEffect, useState } from "react";
import AlbumList from "../components/AlbumList";
import SearchForm from "../components/SearchForm";

export default function Home({ savedAlbumIds, onToggleSave }) {
  const [albums, setAlbums] = useState([]);
  const [pageState, setPageState] = useState("FEATURED");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, [query]);

  async function fetchAlbums() {
    const url =
      pageState === "FEATURED"
        ? "http://localhost:3000/api/featured"
        : `http://localhost:3000/api/search?artist=${query}`;

    try {
      const response = await fetch(url);
      const albums = await response.json();

      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SearchForm
        onSubmit={(query) => {
          setQuery(query);
          setPageState("SEARCHED");
        }}
      />
      <AlbumList
        list={albums}
        title={pageState === "FEATURED" ? "Featured" : `Results for: ${query}`}
        onToggleSave={onToggleSave}
        savedAlbumIds={savedAlbumIds}
      />
    </>
  );
}
