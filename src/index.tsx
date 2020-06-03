import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const COLORS = { xColor: '#178fc2', oColor: '#912c1a', neutralColor: '#ffffff' }
const SYMBOLS = { X: 'X', O: 'O' }

interface SquareProps {
  value?: string
  textcolor?: string
  onClick: () => void
}

interface SquareState {
  value: string | null
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={(): void => props.onClick()}
      style={{ color: props.textcolor }}
    >
      {props.value}
    </button>
  )
}

interface BoardProps {
  value?: number
  name?: string
}

interface BoardState {
  squares: string[]
  colors: string[]
  xIsNext: boolean
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      colors: Array(9).fill(COLORS.neutralColor),
      xIsNext: true,
    }
  }
  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        textcolor={this.state.colors[i]}
        onClick={(): void => this.handleClick(i)}
      />
    )
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? SYMBOLS.X : SYMBOLS.O
    const colors = this.state.colors.slice()
    colors[i] = this.state.xIsNext ? COLORS.xColor : COLORS.oColor
    console.log(i)
    this.setState({
      squares: squares,
      colors: colors,
      xIsNext: !this.state.xIsNext,
    })
    console.log(this.state.squares)
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? SYMBOLS.X : SYMBOLS.O}`
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
