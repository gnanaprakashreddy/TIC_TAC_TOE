export default function GameBoard({ onSqauareClickHandle, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowInd) => (
        <li key={rowInd}>
          <ol>
            {row.map((playerSymbol, colInd) => (
              <li key={colInd}>
                <button
                  onClick={() => onSqauareClickHandle(rowInd, colInd)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
