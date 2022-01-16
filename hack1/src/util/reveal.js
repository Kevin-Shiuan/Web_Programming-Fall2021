/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}

    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */}
    {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */}
    if (x<0 || y<0 || x===board.length || y===board.length || board[x][y].revealed ){
      return {board, newNonMinesCount};
    }
    else if(board[x][y].value === 0){
        board[x][y].revealed = true;
        newNonMinesCount++;
        let temp=revealed(board, x-1, y-1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x-1, y, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x-1, y+1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x, y-1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x, y+1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x+1, y-1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x+1, y, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
        temp=revealed(board, x+1, y+1, newNonMinesCount);
        board=temp.board;
        newNonMinesCount=temp.newNonMinesCount;
    }
    else{
      board[x][y].revealed = true;
      newNonMinesCount++;
    }
    console.log("checked "+x+" "+y+", count= "+newNonMinesCount);
    return {board, newNonMinesCount};
};
