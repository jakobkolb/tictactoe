import React from 'react'
import { GameBoard } from './Board'
import * as R from 'ramda'
import { GameState, Board, History } from 'types'

import { getStatus } from 'helpers'
import * as selectors from 'helpers/selectors'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'

const makeMove = actions.createClickAction
const jumpTo = actions.createJumpAction

const mapDispatchToProps = {
  makeMove,
  jumpTo,
}

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

interface Thunk<T> {
  (argument: T): void
}

interface DispatchProps {
  makeMove: (boardIndex: number) => void
  jumpTo: Thunk<number>
}

interface GameComponentProps extends StateProps, DispatchProps {}

const JumpToMoveButton: React.SFC<{ move: number; jumpTo: Thunk<number> }> = ({
  move,
  jumpTo,
}) => (
  <li>
    <button onClick={R.thunkify(jumpTo)(move + 1)}>{`Go to move # ${
      move + 1
    }`}</button>
  </li>
)

const JumpToMovesButtons: React.SFC<{
  history: History
  jumpTo: Thunk<number>
}> = ({ jumpTo, history }) => (
  <>
    {R.times(
      (move: number) => (
        <JumpToMoveButton key={move} jumpTo={jumpTo} move={move} />
      ),
      history.length - 1,
    )}
  </>
)

const JumpToStartButton: React.SFC<{ jumpTo: Thunk<number> }> = ({
  jumpTo,
}) => (
  <li>
    <button onClick={R.thunkify(jumpTo)(0)}>{`Go to game start`}</button>
  </li>
)

const GameComponent: React.SFC<GameComponentProps> = ({
  history,
  status,
  jumpTo,
  makeMove,
  squares,
}) => (
  <div className="game">
    <div className="game-board">
      <GameBoard squares={squares} onClick={makeMove} />
    </div>

    <div className="game-info">
      <Status status={status} />
      <ol>
        <JumpToStartButton jumpTo={jumpTo} />
        <JumpToMovesButtons history={history} jumpTo={jumpTo} />
      </ol>
    </div>
  </div>
)

const Status: React.SFC<{ status: string }> = ({ status }) => (
  <div>{status}</div>
)

export const Game: React.SFC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComponent)
