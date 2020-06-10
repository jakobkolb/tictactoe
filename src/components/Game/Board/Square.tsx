import React from 'react'
import { PLAYERS } from '../../../types'
import * as R from 'ramda'

interface SquareProps {
  player: PLAYERS | null
  onClick: () => void
}

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

export const Square: React.SFC<SquareProps> = ({ onClick, player }) => (
  <button className="square" onClick={onClick} style={{ color: color(player) }}>
    {symbol(player)}
  </button>
)
