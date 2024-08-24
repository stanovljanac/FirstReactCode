function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  // console.log(maxPossiblePoints);
  return (
    <header className="progress">
      <progress
        className=""
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
