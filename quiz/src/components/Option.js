function Option({ question, dispatch, answer }) {
  function handleAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className="btn btn-option"
          key={option}
          onClick={() => handleAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
