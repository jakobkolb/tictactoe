import React from 'react'
import { GameBoard } from './Board'
import * as R from 'ramda'
import { PLAYERS, GameState, Board, History } from 'types'

import { calculateWinner } from 'helpers'
import reducer from 'helpers/reducer'
import * as selectors from 'helpers/selectors'
import * as actions from 'helpers/actions'

export class Game extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: true,
        },
      ],
      stepNumber: 0,
    }
  }

  dispatch = (action: actions.Action): void => {
    R.pipe(reducer, this.setState.bind(this))(this.state, action)
  }

  makeMove = (boardIndex: number): void =>
    this.dispatch(actions.createClickAction(boardIndex))

  jumpTo = (step: number): void => this.dispatch(actions.createJumpAction(step))

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const xIsNext = current.xIsNext
    const winner = calculateWinner(history)
    const squares = selectors.getCurrentBoardFromState(this.state)

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext ? PLAYERS.X : PLAYERS.O}`
    }

    const stateProps = {
      squares,
      history,
      status,
    }

    const dispatchProps = {
      makeMove: this.makeMove,
      jumpTo: this.jumpTo,
    }

    const gameComponentProps = {
      ...dispatchProps,
      ...stateProps,
    }

    return <GameComponent {...gameComponentProps} />
  }
}

interface StateProps {
  history: History
  status: string
  squares: Board
}

interface DispatchProps {
  makeMove: (boardIndex: number) => void
  jumpTo: (step: number) => void
}

interface GameComponentProps extends StateProps, DispatchProps {}

const GameComponent: React.SFC<GameComponentProps> = ({
  history,
  status,
  jumpTo,
  makeMove,
  squares,
}) => {
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Go to game start`
    return (
      <li key={move}>
        <button onClick={R.thunkify(jumpTo)(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <GameBoard squares={squares} onClick={makeMove} />
      </div>

      <div className="game-info">
        <Status status={status} />
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

const Status: React.SFC<{ status: string }> = ({ status }) => (
  <div>{status}</div>
)
