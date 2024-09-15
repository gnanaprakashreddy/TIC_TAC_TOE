import { useState } from "react";

export default function Player({ name, symbol, isActive, onPlayerChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  let playerNameTab = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameTab = (
      <input
        type="text"
        required
        value={playerName}
        onChange={inputChangeHandler}
      />
    );
  }

  function enableEditing() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onPlayerChange(symbol, playerName);
    }
  }

  function inputChangeHandler(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameTab}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={enableEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
