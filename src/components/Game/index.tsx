import React from 'react'
import { GameBoard } from './Board'
import * as R from 'ramda'
import { GameState, Board, History } from 'types'

import { getStatus } from 'helpers'
import * as selectors from 'helpers/selectors'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'

const makeMove = (dispatch: any) => (boardIndex: number): void =>
  dispatch(actions.createClickAction(boardIndex))

const jumpTo = (dispatch: any) => (step: number): void =>
  dispatch(actions.createJumpAction(step))

const mapDispatchToProps: (dispatch: any) => DispatchProps = R.applySpec({
  makeMove: makeMove,
  jumpTo: jumpTo,
})

const mapStateToProps: (state: GameState) => StateProps = R.applySpec({
  squares: selectors.getCurrentBoardFromState,
  history: selectors.getHistory,
  status: getStatus,
})

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

export const Game: React.SFC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComponent)
