import { GameState, HistoryElement, History, Board } from 'types'
import * as R from 'ramda'

const getHistory: (state: GameState) => History = R.prop('history')

export const getCurrentBoardFromHistory: (history: History) => Board = R.pipe<
  History,
  HistoryElement,
  Board
>(R.last, R.prop('squares'))

export const getCurrentBoardFromState: (state: GameState) => Board = R.pipe(
  getHistory,
  getCurrentBoardFromHistory,
)
