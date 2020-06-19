import React from 'react'
import { GameBoard } from './Board'
import * as R from 'ramda'
import { GameState, Board, History } from 'types'

import { getStatus } from 'helpers'
import * as selectors from 'helpers/selectors'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'
import { HistoryNavigation } from './History'

const mapDispatchToProps = {
  makeMove: actions.createClickAction,
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

interface DispatchProps {
  makeMove: (boardIndex: number) => void
}

interface GameComponentProps extends StateProps, DispatchProps {}

const GameComponent: React.SFC<GameComponentProps> = ({
  history,
  status,
  makeMove,
  squares,
}) => (
  <div className="game">
    <div className="game-board">
      <GameBoard squares={squares} onClick={makeMove} />
    </div>

    <div className="game-info">
      <Status status={status} />
      <HistoryNavigation history={history} />
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
