import React from "react";

export default function Question(props) {
  const { question, answersList, onClick } = props;

  let answerItem =
    answersList &&
    answersList.map((answer, index) => (
      <li
        key={index}
        dangerouslySetInnerHTML={{ __html: answer }}
        onClick={(e) => onClick(e)}
      ></li>
    ));

  return (
    <div className="question-body">
      <h3
        className="quiz-question"
        dangerouslySetInnerHTML={{ __html: question }} // Render HTML entities
      ></h3>

      <ul className="quiz-answer">{answerItem}</ul>
    </div>
  );
}
