import React from 'react'
import { Board } from './Board'
import * as R from 'ramda'
import { PLAYERS } from '../../types'

import {
  calculateWinner,
  clickReducer,
  jumpReducer,
  xIsNext,
  getCurrentBoardFromNewState,
} from 'helpers'
import reducer from 'helpers/reducer'

interface GameProps {
  value?: number
  name?: string
}

export interface HistoryElement {
  squares: (PLAYERS | null)[]
}

export interface GameState {
  history: number[]
  stepNumber: number
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props)
    this.state = {
      history: [],
      stepNumber: 0,
    }
  }

  handleClick(i: number): void {
    const newState = clickReducer(this.state, { type: 'CLICK', index: i })
    this.setState(newState)
  }

  jumpTo(step: any) {
    const newState = jumpReducer(this.state, { type: 'JUMP', step: step })
    this.setState(newState)
  }

  createMove(step: number, move: number | undefined, array: number[]) {
    const desc = move ? `Go to move # ${move}` : `Go to game start`
    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    )
  }

  createMoves(history: number[]) {
    return R.pipe(R.concat([undefined]), R.map(this.createMove))(history)
  }

  render() {
    const history = this.state.history
    const winner = calculateWinner(
      getCurrentBoardFromNewState(this.state.history),
    )

    const moves = createMoves(history)

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext(history) ? PLAYERS.X : PLAYERS.O}`
    }

    const Status: React.SFC<{ status: string }> = ({ status }) => (
      <div>{status}</div>
    )

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={getCurrentBoardFromNewState(this.state.history)}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <Status status={status} />
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
