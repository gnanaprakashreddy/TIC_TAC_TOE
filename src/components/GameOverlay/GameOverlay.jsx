export default function GameOverlay({ winner, onClickRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} has won..!</p>}
      {!winner && <p>It's a Draw..!</p>}
      <p>
        <button onClick={onClickRestart}>ReMatch..!</button>
      </p>
    </div>
  );
}
