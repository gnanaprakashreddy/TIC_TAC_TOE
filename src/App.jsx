import { useState } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Player from "./components/Player/Player";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOverlay from "./components/GameOverlay/GameOverlay";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  O: "Player 1",
  X: "Player 2",
};

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol !== null &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "O";

  if (gameTurns.length > 0 && gameTurns[0].player === "O") {
    currentPlayer = "X";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayerName] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  gameTurns.map((turn) => {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  });

  let winner = deriveWinner(gameBoard, players);
  let hasDrawn = gameTurns.length == 9 && !winner;

  function handleClickOnSquare(rowInd, colInd) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleSetPlayer(symbol, playerName) {
    setPlayerName((prevState) => {
      return {
        ...prevState,
        [symbol]: playerName,
      };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerChange={handleSetPlayer}
          />
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerChange={handleSetPlayer}
          />
        </ol>
        {(winner || hasDrawn) && (
          <GameOverlay winner={winner} onClickRestart={handleRestart} />
        )}
        <GameBoard
          onSqauareClickHandle={handleClickOnSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
