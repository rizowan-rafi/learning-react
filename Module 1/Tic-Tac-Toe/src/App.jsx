// import React from 'react'
import {useState} from 'react'
function Square({ fun, squares }) {
    
    return (
        <>
            <button onClick={fun} className="bg-white border cursor-pointer border-gray-400 h-12 w-12 m-1 leading-9 text-lg">
                {squares}
            </button>
        </>
    );
}

  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function Board({isFirst,squares,onPlay}) {
  // const [isX, setIsX] = useState(true);

  // console.log(squares)
  
  const winner = calculateWinner(squares);
  let status;
  if (winner)
    status = `Winner : ${winner}`
  else if (!winner && squares.filter(s=>s===null).length===0)
    status = `Draw`
  else
    status= "Next Player : " + (isFirst?"X":"O")

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice()
    if (isFirst) nextSquares[i] = "X";
    else  nextSquares[i] = "O";

    onPlay(nextSquares);
    // setSquares(nextSquares)
    // setIsFirst(!isFirst);
  }
  return (
    <>
      <div>{status}</div>
          <div className="flex">
              <Square squares={squares[0]} fun={() => handleClick(0)} />
              <Square squares={squares[1]} fun={() => handleClick(1)} />
              <Square squares={squares[2]} fun={() => handleClick(2)} />
          </div>
          <div className="flex">
              <Square squares={squares[3]} fun={()=>handleClick(3)} />
              <Square squares={squares[4]} fun={()=>handleClick(4)} />
              <Square squares={squares[5]} fun={()=>handleClick(5)} />
          </div>
          <div className="flex">
              <Square squares={squares[6]} fun={()=>handleClick(6)} />
              <Square squares={squares[7]} fun={()=>handleClick(7)} />
              <Square squares={squares[8]} fun={()=>handleClick(8)} />
          </div>
      </>
  );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isFirst, setIsFirst] = useState(true);
  const [currentMove,setCurrentMove]= useState(0)

  // const currentSquare = history[history.length-1]
  const currentSquare = history[currentMove]
  
  const handlePlay = (nextSquares) => {
    setIsFirst(!isFirst);
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares]
    // setHistory([...history,nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
  }

  const handleMove = (i) => {
    setCurrentMove(i)
    setIsFirst(i%2===0)
  }

  const moves = history.map((h,i) => {
    let description;
    if (i > 0)
      description=`Go to the move #${i}`
    else
      description=`Go to start the game`
    return (
      <li key={h}><button onClick={()=>handleMove(i)} className='cursor-pointer p-1 hover:bg-yellow-300'>{description}</button></li>
    )
  })
  return (
      <div className='flex justify-center gap-10 h-screen items-center'>
          <div>
              <Board isFirst={isFirst} squares={currentSquare} onPlay={handlePlay} />
          </div>
      <div className="border list-none p-3 space-y-3">{moves}</div>
      </div>
  );
}


