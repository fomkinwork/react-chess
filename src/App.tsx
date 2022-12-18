import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import BoardComponent from './components/BoardComponent';

import { Board } from './components/models/Board';


const App = () => {
    const [board, setBoard] = useState(new Board())

    function restart () {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    useEffect(() =>
        restart()
    ,[]);

  return (
    <div className="app">
      <BoardComponent
          board={board}
          setBoard={setBoard}
      />
    </div>
  );
}

export default App;
