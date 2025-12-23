// import React from 'react'
import { useEffect, useState } from "react";
function Square({ fun, squares, isWinning }) {
    return (
        <>
            <button
                onClick={fun}
                className={` ${
                    isWinning ? "bg-red-200" : "bg-white"
                } border cursor-pointer border-gray-400 h-12 w-12 m-1 leading-9 text-lg`}
            >
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return {
                winner: squares[a],
                winnerMove: [a, b, c],
            };
        }
    }
    return null;
}

function Board({ isFirst, squares, onPlay, mode }) {
    // const [isX, setIsX] = useState(true);

    // console.log(squares)

    const winnerDetail = calculateWinner(squares);
    const winner = winnerDetail?.winner;
    const winMove = winnerDetail?.winnerMove;
    let status;
    if (winner) {
        status = `Winner : ${winner}`;
    } else if (!winner && squares.filter((s) => s === null).length === 0)
        status = `Draw`;
    else status = "Next Player : " + (isFirst ? "X" : "O");

    const handleClick = (i) => {
        if (squares[i]) return;
        if (winner) return;
        if (mode === "AI" && !isFirst) return;

        const nextSquares = squares.slice();
        if (isFirst) nextSquares[i] = "X";
        else nextSquares[i] = "O";

        onPlay(nextSquares);
        // setSquares(nextSquares)
        // setIsFirst(!isFirst);
    };
    return (
        <>
            <div>{status}</div>
            <div className="flex justify-center">
                <Square
                    isWinning={winMove?.includes(0)}
                    squares={squares[0]}
                    fun={() => handleClick(0)}
                />
                <Square
                    isWinning={winMove?.includes(1)}
                    squares={squares[1]}
                    fun={() => handleClick(1)}
                />
                <Square
                    isWinning={winMove?.includes(2)}
                    squares={squares[2]}
                    fun={() => handleClick(2)}
                />
            </div>
            <div className="flex justify-center">
                <Square
                    isWinning={winMove?.includes(3)}
                    squares={squares[3]}
                    fun={() => handleClick(3)}
                />
                <Square
                    isWinning={winMove?.includes(4)}
                    squares={squares[4]}
                    fun={() => handleClick(4)}
                />
                <Square
                    isWinning={winMove?.includes(5)}
                    squares={squares[5]}
                    fun={() => handleClick(5)}
                />
            </div>
            <div className="flex justify-center">
                <Square
                    isWinning={winMove?.includes(6)}
                    squares={squares[6]}
                    fun={() => handleClick(6)}
                />
                <Square
                    isWinning={winMove?.includes(7)}
                    squares={squares[7]}
                    fun={() => handleClick(7)}
                />
                <Square
                    isWinning={winMove?.includes(8)}
                    squares={squares[8]}
                    fun={() => handleClick(8)}
                />
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [isFirst, setIsFirst] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    const [aiThinking, setAiThinking] = useState(false);
    const [mode, setMode] = useState(null);
    // const [aiText,setAiText]=useState('')

    function minimax(board, isMaximizing) {
        const winnerDetail = calculateWinner(board);
        const winner = winnerDetail?.winner;

        if (winner === "O") return 1; 
        if (winner === "X") return -1; 
        if (board.every((s) => s !== null)) return 0; 

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    board[i] = "O";
                    const score = minimax(board, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    board[i] = "X";
                    const score = minimax(board, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function getBestMove(board) {
        let bestScore = -Infinity;
        let move = null;

        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = "O";
                const score = minimax(board, false);
                board[i] = null;

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    // const currentSquare = history[history.length-1]
    const currentSquare = history[currentMove];

    const handlePlay = (nextSquares) => {
        setIsFirst(!isFirst);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // setHistory([...history,nextSquares])
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const handleMove = (i) => {
        setCurrentMove(i);
        setIsFirst(i % 2 === 0);
    };

    useEffect(() => {
        if (mode !== "AI") return;

        const winner = calculateWinner(currentSquare)?.winner;
        const isLatestMove = currentMove === history.length - 1;

        if (!isFirst && !winner && isLatestMove) {
            

          setAiThinking(true);
          const aiTimeout = setTimeout(() => {
            // setAiText("Ai is thinking...")
                const move = getBestMove(currentSquare); 
                if (move !== null) {
                    const nextSquares = currentSquare.slice();
                    nextSquares[move] = "O";
                    handlePlay(nextSquares);
                }
            setAiThinking(false);
            // setAiText('')
            }, 800);

            return () => clearTimeout(aiTimeout);
        }
    }, [currentSquare, isFirst, currentMove, history.length,mode]);

    const moves = history.map((h, i) => {
        let description;
        if (i > 0) description = `Go to the move #${i}`;
        else description = `Go to start the game`;
        return (
            <li key={h}>
                <button
                    onClick={() => handleMove(i)}
                    className="cursor-pointer p-1 hover:bg-yellow-300"
                >
                    {description}
                </button>
            </li>
        );
    });

    if (!mode) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h2 className="text-xl font-bold">Choose Game Mode</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode("2P")}
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Two Player
                    </button>
                    <button
                        onClick={() => setMode("AI")}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Play vs AI
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex-col flex lg:flex-row justify-center gap-10 h-screen items-center">
            <div className="text-center mt-5 lg:mt-0">
                <button
                    className="p-2  bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => window.location.reload()}
                >
                    Restart Game
                </button>
            </div>
            {aiThinking ? (
                <p className="text-center">AI is thinking...</p>
            ) : null}
            <div className="text-center">
                <div>
                    {mode === "AI" ? "human(X) vs AI(O)" : "human(X) vs human(O)"}
                </div>
                <Board
                    isFirst={isFirst}
                    squares={currentSquare}
                    onPlay={handlePlay}
                    mode={mode}
                />
            </div>
            <div className="border list-none p-3 space-y-3 mt-5 lg:mt-0">
                {moves}
            </div>
        </div>
    );
}
