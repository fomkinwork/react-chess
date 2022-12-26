import React, {FC, useEffect, useState} from 'react';
import {Board} from "./models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "./models/Cell";

interface IBoardComponent {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<IBoardComponent> = ({board, setBoard}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function cellOnClick (cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            updateBoard()
        } else {
            setSelectedCell(cell)
        }
    }

    useEffect(()=> {
        highlightCell()
    },[selectedCell])

    //Подсвечиваем ячейку и ререндерим доску
    function highlightCell () {
        board.highlightCell(selectedCell)
        updateBoard()
    }

    //Обновляем доску
    function updateBoard () {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            click = {cellOnClick}
                            cell={cell}
                            key={cell.id}
                            selected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y }
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;
