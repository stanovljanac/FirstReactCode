function Option({ question, dispatch, answer }) {
  const answered = answer !== null;
  function handleAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answered}
          onClick={() => handleAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
