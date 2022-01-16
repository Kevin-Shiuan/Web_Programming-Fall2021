/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        let temp=createBoard(boardSize,mineNum);
        setBoard(temp.board);
        setMineLocations(temp.mineLocations);
        setRemainFlagNum(temp.mineLocations.length);
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        setNonMineCount(0);
        setGameOver(false);
        setWin(false);
        freshBoard();
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        let cells = board;
        // temp = cells[x][y].flagged;
        if (remainFlagNum){
            if(!cells[x][y].flagged){
                cells[x][y].flagged = true;
                setRemainFlagNum(remainFlagNum-1);
            }
            else{
                cells[x][y].flagged = false;
                setRemainFlagNum(remainFlagNum+1);
            }
        }
        else{
            if(cells[x][y].flagged){
                cells[x][y].flagged = false;
                setRemainFlagNum(remainFlagNum+1);
            }
        }
        setBoard(cells);
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        let cells = board,
            tempNonMineCount = nonMineCount;
        if(cells[x][y].revealed || cells[x][y].flagged || win || gameOver){
            return null;
        }
        else if(mineLocations.some(mine=>(mine[0]===x && mine[1]===y ))){
            cells[x][y].revealed = true;
            console.log("boom!");
            mineLocations.map( (mine)=>{cells[mine[0]][mine[1]].revealed = true;} );
            setGameOver(true);
        }
        else{
            console.log("Lucky one!");
            // cells[x][y].revealed = true;
            let temp = revealed(cells, x, y, tempNonMineCount);
            cells = temp.board;
            tempNonMineCount = temp.newNonMinesCount;
            console.log(tempNonMineCount);
            ((tempNonMineCount+mineLocations.length)===boardSize*boardSize )?setWin(true):setNonMineCount(tempNonMineCount);
        }
        setBoard(cells);
    };
    return(
        <div className = 'boardPage' >
            <div className = "boardWrapper" >
                {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}
                {/* -- TODO 3-1 -- */}
                {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
                {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className = "boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {board.map( (r,indexX)=><div key={indexX} id={"row"+indexX} style = {{display: 'flex'}}>{
                        r.map( (c,indexY)=><Cell key={indexX+"-"+indexY} rowIdx={indexX} colIdx={indexY} detail={c} updateFlag={updateFlag} revealCell={revealCell}/> )
                    }</div> )} 
                </div>
                {win || gameOver && <Modal restartGame={restartGame} backToHome={backToHome} win={win}/>}
            </div>
        </div>
    ); 

    

}

export default Board