import React from 'react';
import './Game.css';

function Square(props) {
  return (
    <button className ={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

let winList = [];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{value:Array(2).fill(null)}],
      //squares: Array(400).fill(null),
      stepNumber: 0,
      i: -1,
      xIsNext: true,
      won: false,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = Array(400).fill(null);
    for (let i = 0; i <= this.state.stepNumber; i++) {
      squares[this.state.history[i].value[0]] = this.state.history[i].value[1];

    }
    if (this.state.won || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let value =[];
    value.push(i,squares[i]);
    this.setState({
      history:history.concat([{
        value: value
      }]),
      //squares: squares,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      i: i,
    });

  }

  jumpTo(step) {
    winList = [];
    this.setState({
      stepNumber: step,
      won:false,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const { history } = this.state;
    const squares = Array(400).fill(null);
    for (let i = 0; i <= this.state.stepNumber; i++) {
      squares[this.state.history[i].value[0]] = this.state.history[i].value[1];

    }
    const { i } = this.state;
    const winner = calculateWinner(squares, i);
    const moves = history.map((step, move) => {
      const backgroundBtn = (move === this.state.stepNumber && this.state.stepNumber !== 0) ?
          "btn-chosen" :
          "btn-play";
      const desc = move ?
          'Go to move ' + move :
          'Go to game start';
      return (
          <li key={move}>
            <button className={backgroundBtn} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
      )
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      this.state.won = true;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
          <div className="game-board">
            <div >
              <div className="status">{status}</div>
              <div className="nobr">
                <button className="re-play" onClick={
                  () => this.setState({
                    history: [{value:Array(2).fill(null)}],
                    //squares: Array(400).fill(null),
                    stepNumber: 0,
                    i: -1,
                    xIsNext: true,
                    won: false,
                  })
                }>CHƠI LẠI</button>
              </div>
            </div>
            <Board
                squares={squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="state">History</div>
            <ol className="idbtn-play">{moves}</ol>
          </div>
        </div>
    );
  }
}
function calculateWinner(squares, i) {
  let x, y;
  if (i !== -1) {
    x = Math.floor(i / 20);
    y = i % 20;
    winList =[];
    var list = [squares[i], null];

    if (checkWin(squares, x, y, 1) === 4 && (list.includes(squares[(x - 5) * 20 + y]) || list.includes(squares[(x + 1) * 20 + y]))) {
      winList.push(i, i - 20, i - 40, i - 60, i - 80);
      return squares[i];
    }
    else if (checkWin(squares, x, y, 2) === 4 && (list.includes(squares[(x + 5) * 20 + y]) || list.includes(squares[(x - 1) * 20 + y]))) {
      winList.push(i, i + 20, i + 40, i + 60, i + 80);
      return squares[i];
    }
    else if (checkWin(squares, x, y, 3) === 4 && (list.includes(squares[x * 20 + (y - 5)]) || list.includes(squares[x * 20 + (y + 1)]))) {
      winList.push(i, i - 1, i - 2, i - 3, i - 4);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 4) === 4 && (list.includes(squares[x * 20 + (y + 5)]) || list.includes(squares[x * 20 + (y - 1)]))){
      winList.push(i, i + 1, i + 2, i + 3, i + 4);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 5) === 4 && (list.includes(squares[(x - 5) * 20 + (y - 5)]) || list.includes(squares[(x + 1) * 20 + (y + 1)]))){
      winList.push(i, i - 21, i - 42, i - 63, i - 84);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 6) === 4 && (list.includes(squares[(x + 5) * 20 + (y - 5)]) || list.includes(squares[(x - 1) * 20 + (y + 1)]))){
      winList.push(i, i + 19, i + 38, i + 57, i + 76);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 7) === 4 && (list.includes(squares[(x - 5) * 20 + (y + 5)]) || list.includes(squares[(x + 1) * 20 + (y - 1)]))){
      winList.push(i, i - 19, i - 38, i - 57, i - 76);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 8) === 4 && (list.includes(squares[(x + 5) * 20 + (y + 5)]) || list.includes(squares[(x - 1) * 20 + (y - 1)]))){
      winList.push(i, i + 21, i + 42, i + 63, i + 84);
      return squares[i];
    }
    else if(checkWin(squares, x, y, 1) + checkWin(squares, x, y, 2) === 4 && (list.includes(squares[(x - checkWin(squares, x, y, 1) - 1) * 20 + y]) || list.includes(squares[(x + checkWin(squares, x, y, 2) + 1) * 20 + y]))){
      let tmp1 =checkWin(squares, x, y, 1);
      let tmp2 =checkWin(squares, x, y, 2);
      let tmp3 = i;
      let tmp4 = i;
      winList.push(i);
      while(tmp1 > 0 && tmp2 > 0)
      {
        if(tmp1 > 0){
          winList.push(tmp3 - 20);
          tmp3 -= 20;
          tmp1--;
        }
        if(tmp2 > 0){
          winList.push(tmp4 + 20);
          tmp4 += 20;
          tmp2--;
        }
      }
      return squares[i];

    }
    else if(checkWin(squares, x, y, 3) + checkWin(squares, x, y, 4) === 4 && (list.includes(squares[x * 20 + (y - checkWin(squares, x, y, 3) - 1)]) || list.includes(squares[x * 20 + (y + checkWin(squares, x, y, 4) + 1)]))) {
      let tmp1 =checkWin(squares, x, y, 3);
      let tmp2 =checkWin(squares, x, y, 4);
      let tmp3 = i;
      let tmp4 = i;
      winList.push(i);
      while(tmp1 > 0 || tmp2 > 0)
      {
        if(tmp1 > 0){
          winList.push(tmp3 - 1);
          tmp3 -= 1;
          tmp1--;
        }
        if(tmp2 > 0){
          winList.push(tmp4 + 1);
          tmp4 += 1;
          tmp2--;
        }
      }
      return squares[i];
    }
    else if(checkWin(squares, x, y, 5) + checkWin(squares, x, y, 8) === 4 && (list.includes(squares[(x - checkWin(squares, x, y, 5) - 1) * 20 + (y - checkWin(squares, x, y, 5) - 1)]) || list.includes(squares[(x + checkWin(squares, x, y, 8) + 1) * 20 + (y + checkWin(squares, x, y, 8) + 1)]))){
      let tmp1 =checkWin(squares, x, y, 5);
      let tmp2 =checkWin(squares, x, y, 8);
      let tmp3 = i;
      let tmp4 = i;
      winList.push(i);
      while(tmp1 > 0 && tmp2 > 0)
      {
        if(tmp1 > 0){
          winList.push(tmp3 - 21);
          tmp3 -= 21;
          tmp1--;
        }
        if(tmp2 > 0){
          winList.push(tmp4 + 21);
          tmp4 += 21;
          tmp2--;
        }
      }
      return squares[i];
    }
    else if(checkWin(squares, x, y, 6) + checkWin(squares, x, y, 7) === 4 && (list.includes(squares[(x + checkWin(squares, x, y, 6) + 1) * 20 + (y - checkWin(squares, x, y, 6) - 1)]) || list.includes(squares[(x - checkWin(squares, x, y, 7) - 1) * 20 + (y + checkWin(squares, x, y, 7) + 1)]))){
      let tmp1 =checkWin(squares, x, y, 6);
      let tmp2 =checkWin(squares, x, y, 7);
      let tmp3 = i;
      let tmp4 = i;
      winList.push(i);
      while(tmp1 > 0 && tmp2 > 0)
      {
        if(tmp1 > 0){
          winList.push(tmp3 + 19);
          tmp3 += 19;
          tmp1--;
        }
        if(tmp2 > 0){
          winList.push(tmp4 - 19);
          tmp4 -= 19;
          tmp2--;
        }
      }
      return squares[i];
    }
  }
  return null;
}

class Board extends React.Component {

  renderSquare(i) {
    const winColor =  winList.includes(i) ? "win" : "square";
    return (
      <Square className = {winColor}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render = () => {
    let table = [];
    for (let i = 0; i < 20; i++) {
      var tmp = [];
      for (let j = 0; j < 20; j++) {
        tmp.push(this.renderSquare(i * 20 + j));
      }
      
      table.push(
        <div key={i} className="board-row">
          {tmp}
        </div>
      );
    }
    return (
      <div className="board">
        <div className="container">
          {table}
        </div>
      </div>
    );
  }
}

function checkWin(squares, x, y, chieu) {
  let x1 = x;
  let y1 = y;
  switch (chieu) {
    //"u"
    case 1:
      if (x1 > 0 && squares[(x1 - 1) * 20 + y1] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 - 1, y1, 1) + 1;
      }
      break;
    //"d"
    case 2:
      if (x1 > 0 && x1 < 19 && squares[(x1 + 1) * 20 + y1] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 + 1, y1, 2) + 1;
      }
      break;
    //"l"
    case 3:
      if (y1 > 0 && squares[x1 * 20 + (y1 - 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1, y1 - 1, 3) + 1;
      }
      break;
    //"r"
    case 4:
      if (y1 > 0 && y1 < 19 && squares[x1 * 20 + (y1 + 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1, y1 + 1, 4) + 1;
      }
      break;
    //"lu"
    case 5:
      if (y1 > 0 && x1 > 0 && squares[(x1 - 1) * 20 + (y1 - 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 - 1, y1 - 1, 5) + 1;
      }
      break;
    //"ld"
    case 6:
      if (x1 < 19 && y1 > 0 && squares[(x1 + 1) * 20 + (y1 - 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 + 1, y1 - 1, 6) + 1;
      }
      break;
    //"ru"
    case 7:
      if (x1 > 0 && y1 < 19 && squares[(x1 - 1) * 20 + (y1 + 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 - 1, y1 + 1, 7) + 1;
      }
      break;
    //"rd"
    case 8:
      if (x1 < 19 && y1 < 19 && squares[(x1 + 1) * 20 + (y1 + 1)] === squares[x1 * 20 + y1]) {
        return checkWin(squares, x1 + 1, y1 + 1, 8) + 1;
      }
      break;
    default:
      break;
  }
  return 0;
}

export default Game;