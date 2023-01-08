import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';

import {Board} from './components/models/Board';
import {Player} from "./components/models/Player";
import {Colors} from "./components/models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";


const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    function restart () {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    useEffect(() => {
            restart()
            setCurrentPlayer(whitePlayer)
        }
    ,[])

    function swapPlayer () {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
            />
            <LostFigures figures={board.lostBlackFigures} title="Черные фигуры"/>
            <LostFigures figures={board.lostWhiteFigures} title="Белые фигуры"/>
        </div>
  );
}

export default App;
