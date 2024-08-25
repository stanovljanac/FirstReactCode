function FinishScreen({ points, max, highScore, dispatch }) {
  return (
    <div>
      <h1 className="result">
        You scored <strong>{points}</strong> out of {max}
      </h1>

      <p className="highscore">(Highscore : {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
