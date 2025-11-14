import React from "react";

const speciesToColor = (speciesArray) => {
  const s = (speciesArray && speciesArray[0]) || "human";
  const hash = Array.from(s).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const colors = ["#FDE68A", "#BFDBFE", "#C7F9CC", "#FBCFE8", "#E6E6FA"];
  return colors[hash % colors.length];
};

const CharacterCard = ({ character, onClick }) => {
  const imgUrl = `${import.meta.env.VITE_APP_PICSUM_URL}/${encodeURIComponent(character.name)}/300/200`;

  const bg = speciesToColor(character.species);

  return (
    <div className="card" onClick={onClick} style={{ background: bg }}>
      <div className="card-image">
        <img src={imgUrl} alt={character.name} />
      </div>
      <div className="card-body">
        <h3>{character.name}</h3>
        <p>
          <strong>Birth Year:</strong> {character.birth_year}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
