import { GameState, HistoryElement } from '../components/Game'
import { PLAYERS } from 'types'
import * as R from 'ramda'

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

export const calculateWinner = (squares: (string | null)[]): string | null => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export const getCurrentBoardFromState: (state: GameState) => PLAYERS[] = R.pipe<
  GameState,
  HistoryElement[],
  HistoryElement,
  PLAYERS[]
>(
  R.prop('history') as (state: GameState) => HistoryElement[],
  R.last,
  R.prop('squares') as (ele: HistoryElement) => PLAYERS[],
)

export const clickReducer = (
  state: GameState,
  action: { type: string; index: number },
): GameState => {
  if (action.type !== 'CLICK') {
    return state
  }
  const stepNumber = state.stepNumber
  const history = state.history.slice(0, stepNumber + 1)
  const current = history[history.length - 1]
  const xIsNext = current.xIsNext
  const squares = current.squares.slice()
  if (calculateWinner(squares) || squares[action.index]) {
    return state
  }
  squares[action.index] = xIsNext ? PLAYERS.X : PLAYERS.O
  return {
    history: history.concat([
      {
        squares: squares,
        xIsNext: !xIsNext,
      },
    ]),
    stepNumber: history.length,
  }
}

export const jumpReducer = (
  state: GameState,
  action: { type: string; step: number },
): GameState => {
  if (action.type !== 'JUMP') {
    return state
  }
  return R.pipe<GameState, HistoryElement[], GameState>(
    R.prop('history'),
    R.applySpec({
      history: R.take(action.step + 1),
      stepNumber: R.always(action.step),
    }),
  )(state)
}
