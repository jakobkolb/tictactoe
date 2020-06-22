import React from 'react'
import { Dispatch } from 'redux'
import { Board, GameState, PLAYERS } from '../../../types'
import * as R from 'ramda'
import { getCurrentBoardFromState } from '../../../helpers/selectors'
import * as actions from './../../../helpers/actions'
import { connect } from 'react-redux'

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

const playersToChars = {
  [PLAYERS.X]: 'X',
  [PLAYERS.O]: 'O',
}

export const symbol: (player: PLAYERS | null) => string | null = R.pipe<
  PLAYERS | null,
  string | undefined,
  string | null
>(R.flip(R.prop)(playersToChars) as any, R.defaultTo(null))

const playersToColors = {
  [PLAYERS.X]: '#178fc2',
  [PLAYERS.O]: '#912c1a',
}

export const color: (player: PLAYERS | null) => string = R.pipe<
  PLAYERS | null,
  string | undefined,
  string
>(R.flip(R.prop)(playersToColors) as any, R.defaultTo('#ffffff'))

export const SquareComponent: React.SFC<SquareProps> = ({
  onClick,
  player,
}) => (
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
