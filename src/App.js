import "./App.css";
import { useState } from "react";

function WordEnter({
  wordleWord,
  onWordChange,
  wordHistory,
  setWordHistory,
  movesLength,
  setMovesLength,
  position,
  setPosition,
  isWinner,
  setWinner,
}) {
  return (
    <input
      type="text"
      placeholder="Enter Wordle"
      id="word"
      value={wordleWord}
      onChange={(e) => onWordChange(e.target.value)}
      onKeyUp={(e) =>
        movesLength >= 5 || isWinner
          ? e.preventDefault()
          : wordProcess({
              e,
              wordleWord,
              onWordChange,
              wordHistory,
              setWordHistory,
              movesLength,
              setMovesLength,
              position,
              setPosition,
              isWinner,
              setWinner,
            })
      }
    />
  );
}
function wordProcess({
  e,
  wordleWord,
  onWordChange,
  wordHistory,
  setWordHistory,
  movesLength,
  setMovesLength,
  position,
  setPosition,
  isWinner,
  setWinner,
}) {
  var key;
  if (window.Event) {
    key = e.keyCode;
  } else if (e.which) {
    key = e.which;
  }
  if (String.fromCharCode(key) === " ") {
    onWordChange(wordleWord.replace(/\s+/g, ""));
    return;
  }
  if (wordleWord.length > 5) {
    onWordChange(wordleWord.slice(0, 5));
    alert("Word Limited exceeded..!!!");
    return;
  }
  if (key === 13 && key !== 32 && wordleWord.length === 5) {
    const newWordHistory = wordHistory.slice();
    const newPosition = position.slice();
    let count = 0;
    for (let i = movesLength * 5; i < movesLength * 5 + 5; i++) {
      const index = movesLength * 5 === 0 ? i : i % (movesLength * 5);
      newWordHistory[i] = wordleWord[index];
    }
    for (let i = movesLength * 5; i < movesLength * 5 + 5; i++) {
      const index = movesLength * 5 === 0 ? i : i % (movesLength * 5);
      const stringLetter = Word[index];

      if (
        Word.includes(newWordHistory[i]) &&
        stringLetter === newWordHistory[i]
      ) {
        newPosition[i] = "cp";
        count++;
      } else if (Word.includes(newWordHistory[i])) {
        newPosition[i] = "wp";
      }
    }
    if (count === 5) {
      setWinner(true);
    }
    count = 0;
    onWordChange("");
    setWordHistory(newWordHistory);
    setMovesLength(++movesLength);
    setPosition(newPosition);
  }
}

function MovesLeft({ moves }) {
  return (
    <>
      <h3> Moves Left : {moves} </h3>
    </>
  );
}

function Header({
  value,
  wordleWord,
  setWordleWord,
  wordHistory,
  setWordHistory,
  movesLength,
  setMovesLength,
  position,
  setPosition,
  isWinner,
  setWinner,
}) {
  return (
    <>
      <div className="headerDiv">
        <div className="input-box">
          <WordEnter
            wordleWord={wordleWord}
            onWordChange={setWordleWord}
            wordHistory={wordHistory}
            setWordHistory={setWordHistory}
            movesLength={movesLength}
            setMovesLength={setMovesLength}
            position={position}
            setPosition={setPosition}
            isWinner={isWinner}
            setWinner={setWinner}
          />
        </div>
        <div className="moves-left">
          <MovesLeft moves={value} />
        </div>
      </div>
    </>
  );
}
function Square({ letter, position }) {
  let classPos = "";
  if (position === "cp") {
    classPos = "correct-position";
  } else if (position === "wp") {
    classPos = "wrong-position";
  }
  return <div className={`square ${classPos}`}>{letter}</div>;
}
function SquareBoard({ wordHistory, position, isWinner, movesLength }) {
  let renderedSquares = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      renderedSquares.push(
        <Square
          letter={wordHistory[i * 5 + j]}
          position={position[i * 5 + j]}
        />
      );
    }
  }
  const declare = isWinner
    ? "You Won...!!!    Score : " + movesLength + " / 5"
    : movesLength >= 5
    ? "You Lost...Try again Next time."
    : "";

  return (
    <>
      <div className="square-board">
        <div className="is-visible"> {declare} </div>
        <br />
        <div className="square-board-row">{renderedSquares.slice(0, 5)}</div>
        <div className="square-board-row">{renderedSquares.slice(5, 10)}</div>
        <div className="square-board-row">{renderedSquares.slice(10, 15)}</div>
        <div className="square-board-row">{renderedSquares.slice(15, 20)}</div>
        <div className="square-board-row">{renderedSquares.slice(20, 25)}</div>
      </div>
    </>
  );
}

const Word = "GRAPE";
export default function App() {
  const [wordHistory, setWordHistory] = useState(Array(25).fill(null));
  const [movesLength, setMovesLength] = useState(0);
  const [wordleWord, setWordleWord] = useState("");
  const [position, setPosition] = useState(Array(25).fill(null));
  const [isWinner, setWinner] = useState(false);
  // console.log(position);
  return (
    <div className="game">
      <Header
        value={5 - movesLength}
        wordleWord={wordleWord.toUpperCase()}
        setWordleWord={setWordleWord}
        wordHistory={wordHistory}
        setWordHistory={setWordHistory}
        movesLength={movesLength}
        setMovesLength={setMovesLength}
        position={position}
        setPosition={setPosition}
        isWinner={isWinner}
        setWinner={setWinner}
      />
      <SquareBoard
        wordHistory={wordHistory}
        position={position}
        isWinner={isWinner}
        movesLength={movesLength}
      />
    </div>
  );
}
