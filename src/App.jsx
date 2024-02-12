import { useState } from "react";
function Square({ value, onSquareClick }) {
  let selectedBg;
  if (value === "O") {
    selectedBg = "bg-green-500/90 shadow-inner  rounded-md";
  } else if (value === "X") {
    selectedBg = "bg-red-400/90 shadow-inner  rounded-md";
  } else {
    selectedBg = "bg-black/40 shadow-rose-black shadow-sm rounded-sm border border-gray-700";
  }
  return (
    <button
      className={` flex justify-center items-center duration-300 font-bold size-24 m-.5 leading-9 text-5xl shadow-black ${selectedBg}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
function Board({ square = [], player, onPlay, totalMove }) {
  // console.log(square);
  let winner = calculateWinner(square);
  const handleClick = (arrayIndex) => {
    // console.log(arrayIndex);

    if (square[arrayIndex] || winner) {
      return;
    }
    const newSquare = [...square];
    newSquare[arrayIndex] = player;
    onPlay(newSquare);
  };
  let playStatus;
  if (winner) {
    playStatus = (
      <div
        className="bg-orange-600 text-2xl font-black animate-pulse
            p-2 rounded-md text-center mb-2 text-white "
      >
        🏆 Winner <span className="text-3xl">{winner}</span> !🏆
      </div>
    );
  } else if (totalMove === 10 && !winner) {
    playStatus = (
      <div
        className="bg-black text-2xl font-medium animate-pulse
        p-2 rounded-md text-white text-center mb-2 "
      >
        Game Draw!😢
      </div>
    );
  } else {
    playStatus = (
      <div
        className={"bg-purple-800 p-2 text-white font-black text-2xl shadow-xl rounded-md text-center mb-2 "}
      >
        {`Now ${player}'s turn`}
      </div>
    );
  }

  return (
    <div className=" w-fit bg-blue-950 ring-1 p-2 rounded-sm overflow-hidden">
      {playStatus}
      <div className="flex flex-grow-1">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [player, setPlayer] = useState("X");
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquare = history[currentMove];

  const handlePlay = (newSquare) => {
    setPlayer(() => (player === "X" ? "O" : "X"));
    const nextHistory = [...history.slice(0, currentMove + 1), newSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  const jumpTo = (move) => {
    setCurrentMove(move);
  };
  const move = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `move #${move}`;
    } else {
      description = `Starting Position`;
    }
    return (
      <li key={move}>
        <button
          className={`${
            currentMove === move && "bg-sky-600 text-slate-300"
          } bg-black/20 text-xs text-center p-1 duration-500 text-slate-400 hover:bg-sky-600 hover:text-white w-full capitalize mt-1`}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });
  return (
    <div>
      <div className="text-6xl font-extrabold text-center text-filter">Tic-Tac-Toe</div>
      <div className="flex mt-5 justify-center gap-4">
        <div>
          <Board player={player} square={currentSquare} onPlay={handlePlay} totalMove={history.length} />
        </div>
        <div className="w-44 bg-emerald-700/20 p-2 rounded-sm flex flex-col justify-between">
          <div className="bg-green-600  text-center text-sm font-semibold p-2 rounded">Game History</div>
          <div className="h-full">
            <ol className="mt-2">{move}</ol>
          </div>
          <button
            className={` bg-red-400 text-xs text-slate-800 text-center p-1 duration-300 hover:bg-red-600 hover:text-white w-full capitalize mt-1`}
            onClick={() => setHistory([[Array(9).fill(null)]])}
          >
            Reset
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(squares[a], squares[b], squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
