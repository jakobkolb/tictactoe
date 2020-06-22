import React from 'react'
import { GameBoard } from './Board'
import * as R from 'ramda'
import { Board, GameState } from 'types'

import * as selectors from 'helpers/selectors'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'
import { HistoryNavigation } from './History'
import { Status } from './Status/Status'

const mapDispatchToProps = {
  makeMove: actions.createClickAction,
}

const mapStateToProps: (state: GameState) => StateProps = R.applySpec({
  squares: selectors.getCurrentBoardFromState,
  history: selectors.getHistory,
})

interface StateProps {
  squares: Board
}

interface DispatchProps {
  makeMove: (boardIndex: number) => void
}

interface GameComponentProps extends StateProps, DispatchProps {}

const GameComponent: React.SFC<GameComponentProps> = ({
  makeMove,
  squares,
}) => (
  <div className="game">
    <div className="game-board">
      <GameBoard squares={squares} onClick={makeMove} />
    </div>

    <div className="game-info">
      <Status />
      <HistoryNavigation />
    </div>
  </div>
)

export const Game: React.SFC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComponent)
