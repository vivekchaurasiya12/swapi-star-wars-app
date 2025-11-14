import React, { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPage = async (p) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SWAPI_URL}?page=${p}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCharacters(data.results || []);
        setCount(data.count || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage(page);
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(count / 10));

  const visible = characters.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="container" style={{ position: "relative" }}>
      {error && <Notification message={error} onClose={() => setError(null)} />}

      <div className="controls">
        <div>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name (current page)"
          />
        </div>

        <div className="pagination-controls">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid">
        {visible.map((char) => (
          <CharacterCard key={char.url} character={char} onClick={() => setSelected(char)} />
        ))}
      </div>

      {loading && <Spinner overlay />}

      {visible.length === 0 && !loading && !error && (
        <div className="center">No characters found on this page.</div>
      )}

      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Home;
