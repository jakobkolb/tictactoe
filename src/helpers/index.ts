import { GameState, HistoryElement, Board, History, PLAYERS } from 'types'
import * as R from 'ramda'
import { Action } from './actions'
import { getCurrentBoardFromHistory, getHistory, getXIsNext } from './selectors'
import * as errors from './errors'

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

export const calculateWinner = (
  state: History,
  action?: Action,
): string | null => {
  const squares = R.pipe<History, HistoryElement, Board>(
    R.last,
    R.prop('squares'),
  )(state)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
const getSquareStatus: (
  state: History,
  boardIndex: number,
) => PLAYERS | null = R.useWith(R.flip(R.prop), [
  getCurrentBoardFromHistory,
  R.identity,
])

const squareIsOccupied: (
  state: History,
  boardIndex: number,
) => boolean = R.pipe(getSquareStatus, R.not, R.not)

const gameIsWon: (state: History, boardIndex: number) => boolean = R.pipe(
  calculateWinner,
  R.not,
  R.not,
)

export const isIllegalMoveOnHistory: (
  state: History,
  boardIndex: number,
) => boolean = R.anyPass([
  gameIsWon as R.SafePred<number | History>,
  squareIsOccupied as R.SafePred<number | History>,
])

export const isIllegalMove: (
  state: GameState | undefined,
  action: Action,
) => boolean = R.ifElse(
  R.isNil,
  errors.throwIllegalStateError,
  R.useWith(isIllegalMoveOnHistory, [R.prop('history'), R.prop('payload')]),
)
export const getWinner: (state: GameState) => string | null = R.pipe(
  getHistory,
  calculateWinner,
)

export const getStatus: (state: GameState) => string = (state) => {
  const winner = getWinner(state)
  if (winner) {
    return `Winner: ${winner}`
  }
  return `Next player: ${getXIsNext(state) ? PLAYERS.X : PLAYERS.O}`
}
