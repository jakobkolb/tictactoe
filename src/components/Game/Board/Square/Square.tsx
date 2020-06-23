import React from 'react'
import { Dispatch } from 'redux'
import { Board, GameState, PLAYERS } from 'types'
import * as R from 'ramda'
import { getCurrentBoardFromState } from 'helpers/selectors'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'
import { color, symbol } from './displayHelpers'

interface OwnProps {
  location: number
}

interface StateProps {
  player: PLAYERS | null
}

interface DispatchProps {
  onClick: () => void
}

interface SquareProps extends OwnProps, StateProps, DispatchProps {}

const SquareComponent: React.SFC<SquareProps> = ({ onClick, player }) => (
  <button className="square" onClick={onClick} style={{ color: color(player) }}>
    {symbol(player)}
  </button>
)

const mapStateToProps = (state: GameState, { location }: OwnProps) => {
  const player = R.pipe<GameState, Board, PLAYERS | null>(
    getCurrentBoardFromState,
    R.prop((location as unknown) as string) as (b: Board) => PLAYERS | null,
  )(state)
  return { player: player }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { location }: OwnProps,
): DispatchProps => ({
  onClick: (): void => dispatch(actions.createClickAction(location)),
})

export const Square = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SquareComponent)
