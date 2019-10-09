/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';

function Square(props) {
  const { color, value } = props;
  const name = `square ${color ? 'win' : ''}`;
  return (
    <button type="button" className={name} onClick={() => props.onClick()}>
      {value}
    </button>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    const { props } = this;
    return (
      <Square
        value={props.squares[i]}
        color={props.colors[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  render() {
    const table = [];
    for (let i = 0; i < 20; i += 1) {
      const tmp = [];
      for (let j = 0; j < 20; j += 1) {
        tmp.push(this.renderSquare(20 * i + j));
      }
      table.push(
        <div key={i} className="board-row">
          {tmp}
        </div>,
      );
    }
    return (
      <div>
        {table}
      </div>
    );
  }
}

export default Board;
