function Question({ questionName, children }) {
  return (
    <div>
      <h4>{questionName}</h4>
      {children}
    </div>
  );
}

export default Question;
