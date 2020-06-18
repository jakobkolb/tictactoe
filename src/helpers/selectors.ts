import { GameState, HistoryElement, History, Board } from 'types'
import * as R from 'ramda'

export const getHistory: (state: GameState) => History = R.prop('history')

export const getStepNumber: (state: GameState) => number = R.pipe(
  getHistory,
  R.prop('length'),
  R.add(-1),
)

export const getXIsNext: (state: GameState) => boolean = R.pipe(
  getStepNumber,
  R.modulo(R.__, 2),
  R.equals(0),
)

export const getCurrentBoardFromHistory: (history: History) => Board = R.pipe<
  History,
  HistoryElement,
  Board
>(R.last, R.prop('squares'))

export const getCurrentBoardFromState: (state: GameState) => Board = R.pipe(
  getHistory,
  getCurrentBoardFromHistory,
)
