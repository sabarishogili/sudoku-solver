import React from 'react';
import './Board.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Board extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      data: [Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null),
                Array(9).fill(null)],
    currentOperation: ["Click Perform to Solve the Puzzle."],
    };

    this.state.data[0][0] = 6;
    this.state.data[0][1] = 5;
    this.state.data[0][3] = 7;
    this.state.data[0][4] = 2;
    this.state.data[1][5] = 6;
    this.state.data[1][7] = 1;
    this.state.data[2][2] = 3;
    this.state.data[2][3] = 5;
    this.state.data[2][5] = 1;
    this.state.data[2][6] = 2;
    this.state.data[2][8] = 7;
    this.state.data[3][2] = 2;
    this.state.data[3][3] = 4;
    this.state.data[3][4] = 3;
    this.state.data[4][0] = 7;
    this.state.data[4][1] = 6;
    this.state.data[4][2] = 8;
    this.state.data[4][6] = 1;
    this.state.data[4][7] = 4;
    this.state.data[4][8] = 3;
    this.state.data[5][4] = 1;
    this.state.data[5][5] = 7;
    this.state.data[5][6] = 5;
    this.state.data[6][0] = 4;
    this.state.data[6][2] = 5;
    this.state.data[6][3] = 1;
    this.state.data[6][5] = 2;
    this.state.data[6][6] = 6;
    this.state.data[7][1] = 8;
    this.state.data[7][3] = 3;
    this.state.data[8][4] = 8;
    this.state.data[8][5] = 5;
    this.state.data[8][7] = 3;
    this.state.data[8][8] = 2;

    this.myClick = this.myClick.bind(this);
    this.solvePuzzle = this.solvePuzzle.bind(this);
    this.playProbability = this.playProbability.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


revolver(i) {
return i - (i%3);
}

removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
       if (index > -1) {
           arr.splice(index, 1);
       }
       return arr;
}

solvePuzzle(data) {
    var countUnsolvedCells = 0;
    var board;
    var countPlaced = 0;

    if(data === undefined) {
        board = this.state.data;
    }
    board.map((col,rowIndex) =>
        col
        .map((element, colIndex) => {
             if(board[rowIndex][colIndex] === null || Array.isArray(board[rowIndex][colIndex])) {
                //block
                var startRow = this.revolver(rowIndex), endRow = startRow+2, i;
                var startCol = this.revolver(colIndex), endCol = startCol+2, j;
                var possibilities  = board[rowIndex][colIndex] === null ? [1,2,3,4,5,6,7,8,9] : board[rowIndex][colIndex];

                countUnsolvedCells++;
                for(i=startRow; i<=endRow;i++) {
                    for(j=startCol; j<=endCol;j++) {
                    if(board[i][j] >=1 && board[i][j] <=9 ) {
                            possibilities = this.removeItemOnce(possibilities, board[i][j]);
                        }
                    }
                }
                //row
                for(i=0;i<9;i++) {
                    if(i !== rowIndex && board[i][colIndex] != null && !Array.isArray(board[i][colIndex])) {
                                                possibilities = this.removeItemOnce(possibilities, board[i][colIndex]);
                    }
                }
                //col
                for(j=0;j<9;j++) {
                    if(j !== colIndex && board[rowIndex][j] != null && !Array.isArray(board[rowIndex][j])) {
                                                possibilities = this.removeItemOnce(possibilities, board[rowIndex][j]);
                    }
                }
                if(possibilities.length === 1) {
                    board[rowIndex][colIndex] = possibilities[0];
                    countPlaced++;
                    this.setState({currentOperation:
                        [ ...this.state.currentOperation,
                            "setting value at:["+rowIndex+"]["+colIndex+"] to " + board[rowIndex][colIndex]]});
                    document.getElementById('basic_'+rowIndex+'_'+colIndex).style.color = "green";
                } else if(possibilities.length > 0) {
                    board[rowIndex][colIndex] = possibilities;
                }
             }
        })
    )

    if (data === undefined) {
        if (countPlaced === 0 && countUnsolvedCells > 0) {
            this.playProbability();
            this.solvePuzzle();
        } else if (countUnsolvedCells > 0) {
            this.solvePuzzle();
        }
        this.setState({data: board});
    } else {
        if (countPlaced === 0 && countUnsolvedCells > 0) {
            this.playProbability(data);
            this.solvePuzzle(data);
        } else if (countUnsolvedCells > 0) {
            this.solvePuzzle(data);
        } else if (countUnsolvedCells === 0) {
            this.setState({data: board});
        }

    }

    console.log(JSON.stringify(board));
}

playProbability(data) {
var board;
var possibilities = [1,2,3,4,5,6,7,8,9];
var row, col;

if(data === undefined) {
        board = this.state.data;
    }

board.map((row, rowIndex) => {
    row.map((ele, colIndex)=>{
        if(Array.isArray(board[rowIndex][colIndex]) && board[rowIndex][colIndex].length < possibilities.length) {
            possibilities = board[rowIndex][colIndex];
            row = rowIndex;
            col = colIndex;
        }
    })
})

possibilities.foreach(function(val) {
    var data = [...board];
    data[row][col] = val;
    this.solvePuzzle(data);
}, this);

}

myClick() {
this.solvePuzzle();
}

handleChange(rowIndex, colIndex, event) {
    this.state.data[rowIndex][colIndex] = parseInt(event.target.value);
    this.forceUpdate();
    /*var newValue = event.target.value;
    this.setState(({ data }) => ({ data:
      data.map((row, i) => {
        row.map((tile, j) => {
          if (i === rowIndex && j === colIndex) {
          var parsed = parseInt(newValue);
            return parsed === Number.NAN? null: parsed ;
          } else {
            return tile;
          }
        })
      })
    }));*/

}

render() {
  return (
             <TableContainer component={Paper} align="center">
             <Table className="puzzle-table" aria-label="a dense table" style={{ borderStyle: 'solid', width: "auto", tableLayout: "auto" }}>
             <TableBody>
            {
                this.state.data.map((row, rowIndex) => (
                <TableRow>
                {
                    row.map((element, colIndex) => (
                            <TableCell padding="none" align="center" borderStyle="solid">
                            <Input id={"basic_"+rowIndex+"_"+colIndex} name={"data["+rowIndex+"]["+colIndex+"]"} type="number"
                                    inputProps={{min: 1, max:9, style: { textAlign: "center" }}} align="center"
                                    onChange={ this.handleChange.bind(this, rowIndex,colIndex) }
                                    value={this.state.data[rowIndex][colIndex]} />

                            </TableCell>

                    ))
                }
                </TableRow>
                ))
            }
            </TableBody>
            </Table>
            <Typography component="div" align="right">
                <Typography component="div" align="center">
                    <List component="nav" aria-label="main transactions list">

                    {this.state.currentOperation.map((message) =>
                            <ListItem button>
                                <ListItemText primary={message} />
                            </ListItem>
                    )}
                    </List>
                </Typography>
                <Button variant="contained" color="primary" onClick={this.myClick}>
                  Perform
                </Button>
            </Typography>
        </TableContainer>
  );
  }
}

export default Board;