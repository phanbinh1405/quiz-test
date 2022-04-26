import React from "react";
import Question from "./Question";

export default function App() {
  const answerEle = document.querySelector(".quiz-answer");
  const [question, setQuestion] = React.useState({});
  const [score, setScore] = React.useState(0);
  const [askedCount, setAskedCount] = React.useState(0);
  const [isEnd, setIsEnd] = React.useState(false);

  // Load Quiz
  React.useEffect(() => {
    getQuiz();
  }, []);

  function getQuiz() {
    fetch("https://opentdb.com/api.php?amount=1")
      .then((res) => res.json())
      .then((data) => {
        let answersList = mergeAnswer(data.results[0]);
        let newQuestion = {
          question: data.results[0].question,
          answersList: answersList,
          correctAnswer: data.results[0].correct_answer,
        };

        setQuestion(newQuestion);
      });
  }

  // Push correct answer to incorrect answer with random index
  function mergeAnswer(data) {
    let correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let optionList = incorrectAnswers;

    optionList.splice(
      Math.floor(Math.random() * (incorrectAnswers.length + 1)),
      0,
      correctAnswer
    );

    return optionList;
  }

  // Selected Answer
  function selectedAnswer(e) {
    let answerItem = answerEle.querySelector("li.chose");
    if (answerItem) {
      answerItem.classList.remove("chose");
    }
    e.target.classList.add("chose");
  }

  // Check Answer True or False
  function checkAnswer() {
    if (answerEle.querySelector("li.chose")) {
      let selectAnswer = answerEle.querySelector("li.chose").innerText;
      if (selectAnswer === question.correctAnswer) {
        setScore(score + 1);
      }
    } else {
      alert("Please Chose An Answer");
      return;
    }
    checkCount();

    setTimeout(() => {
      let answerItem = answerEle.querySelector("li.chose");
      if (answerItem) {
        answerItem.classList.remove("chose");
      }
    }, 400);
  }

  // Check Number of Question
  function checkCount() {
    setAskedCount(askedCount + 1);

    if (askedCount == 9) {
      setIsEnd(true);
    } else {
      setTimeout(getQuiz, 300);
    }
  }

  // Play again
  function playAgain() {
    getQuiz();
    setScore(0);
    setAskedCount(0);
    setIsEnd(false);
  }

  return (
    <main className="quiz-container">
      <div className="quiz-head">
        <h1 className="quiz-title">Quiz Game</h1>
        <div className="quiz-score">
          <span className="correct-score"> {score} </span>/{" "}
          <span className="total-question">10</span>
        </div>
      </div>

      <Question
        question={question.question}
        answersList={question.answersList}
        onClick={selectedAnswer}
      />

      {isEnd && (
        <div className="result">
          {score >= 8 ? 'Chúc Mừng Bạn Đã Vượt Qua Bài Kiểm Tra' : "Bạn Cần Đạt Trên 8 Điểm Để Vượt Qua Bài Kiểm Tra"} <br/>
          Your score is:<span> {score}</span>
        </div>
      )}

      <div className="quiz-footer">
        {!isEnd ? (
          <button className="check-answer" onClick={checkAnswer}>
            Check Answer!
          </button>
        ) : (
          <button className="play-again" onClick={playAgain}>
            Play Again
          </button>
        )}
      </div>
    </main>
  );
}
