import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Board from './Board';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#cfe8fc',
    paddingBottom: 50,
  },
  content: {
    height: '100vh',
  }
}));


function App() {
  const classes = useStyles();
  return (
        <React.Fragment>
              <CssBaseline />
              <Container maxWidth="lg" >
                <Typography component="div" className={classes.root} >
                              <AppBar position="static">
                                <Toolbar variant="dense">
                                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <MenuIcon />
                                  </IconButton>
                                  <Typography variant="h6" color="inherit">
                                    Sudoku Solver
                                  </Typography>
                                </Toolbar>
                              </AppBar>
                </Typography>
                <Paper className={classes.content}>
                <Board />
                </Paper>
              </Container>
         </React.Fragment>
  );
}

export default App;
