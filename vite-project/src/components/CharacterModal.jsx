import React, { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";

const CharacterModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchHomeworld = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(character.homeworld);
        if (!res.ok) throw new Error("Failed to load homeworld");
        const data = await res.json();
        if (mounted) setHomeworld(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHomeworld();
    return () => (mounted = false);
  }, [character]);

  const parseMeters = (heightStr) => {
    if (!heightStr || heightStr === "unknown") return "unknown";
    const n = parseFloat(heightStr);
    if (Number.isNaN(n)) return "unknown";
    return `${(n / 100).toFixed(2)} m`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✖
        </button>
        <h2>{character.name}</h2>

        <div className="modal-grid">
          <div>
            <p>
              <strong>Height:</strong> {parseMeters(character.height)}
            </p>
            <p>
              <strong>Mass:</strong> {character.mass} kg
            </p>
            <p>
              <strong>Birth year:</strong> {character.birth_year}
            </p>
            <p>
              <strong>Films:</strong> {character.films.length}
            </p>
            <p>
              <strong>Date added:</strong> {formatDate(character.created)}
            </p>
          </div>

          <div>
            <h3>Homeworld</h3>
            {loading && <p>Loading homeworld...</p>}
            {error && <p className="error">{error}</p>}
            {homeworld && (
              <div>
                <p>
                  <strong>Name:</strong> {homeworld.name}
                </p>
                <p>
                  <strong>Terrain:</strong> {homeworld.terrain}
                </p>
                <p>
                  <strong>Climate:</strong> {homeworld.climate}
                </p>
                <p>
                  <strong>Population:</strong> {homeworld.population}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
