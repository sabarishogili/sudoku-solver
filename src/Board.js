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
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

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
    this.handleChange = this.handleChange.bind(this);
  }

myClick() {

//alert(this.state.data);

}

handleChange(rowIndex, colIndex, event) {
    this.state.data[rowIndex][colIndex] = event.target.value;
    this.forceUpdate();
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
                <Button variant="contained" color="primary" onClick={this.myClick}>
                  Perform
                </Button>
            </Typography>
        </TableContainer>
  );
  }
}

export default Board;