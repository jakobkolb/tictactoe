import React from 'react'
import '../index.css'
import Board from './board'

const COLORS = { xColor: '#178fc2', oColor: '#912c1a', neutralColor: '#ffffff' }
const SYMBOLS = { X: 'X', O: 'O' }

interface GameProps {
  value?: number
  name?: string
}

interface GameState {
  history: {
    squares: (string | null)[]
    colors: string[]
    xIsNext: boolean
  }[]
  stepNumber: number
}

export const calculateWinner = (squares: (string | null)[]): string | null => {
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

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          colors: Array(9).fill(COLORS.neutralColor),
          xIsNext: true,
        },
      ],
      stepNumber: 0,
    }
  }
  handleClick(i: number): void {
    const stepNumber = this.state.stepNumber
    const history = this.state.history.slice(0, stepNumber + 1)
    const current = history[history.length - 1]
    const xIsNext = current.xIsNext
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? SYMBOLS.X : SYMBOLS.O
    const colors = current.colors.slice()
    colors[i] = xIsNext ? COLORS.xColor : COLORS.oColor
    this.setState({
      history: history.concat([
        {
          squares: squares,
          colors: colors,
          xIsNext: !xIsNext,
        },
      ]),
      stepNumber: history.length,
    })
  }

  jumpTo(step: any) {
    this.setState({
      stepNumber: step,
    })
  }

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const xIsNext = current.xIsNext
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext ? SYMBOLS.X : SYMBOLS.O}`
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            colors={current.colors}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default Game
