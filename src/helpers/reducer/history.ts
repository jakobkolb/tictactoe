import { Board, History, HistoryElement, PLAYERS } from '../../types'
import actions, { Action } from '../actions'
import * as R from 'ramda'
import { getCurrentBoardFromHistory } from '../selectors'
import { createReducer } from 'redux-create-reducer'

const getNextPlayer: (board: Board) => PLAYERS = R.pipe<
  Board,
  boolean[],
  number[],
  number,
  number,
  PLAYERS
>(
  R.map((x) => !!x),
  R.map((x: boolean): number => (x ? 1 : 0)),
  R.sum,
  R.modulo(R.__, 2),
  R.cond<number, PLAYERS>([
    [R.equals(0), R.always(PLAYERS.X)],
    [R.equals(1), R.always(PLAYERS.O)],
  ]),
)
export const createNextSquares: (
  board: Board | undefined,
  action: Action,
) => Board = (board = Array(9).fill(null), action) =>
  R.update(action.payload, getNextPlayer(board), board)
const createNextSquaresFromHistory: (
  history: History,
  action: Action,
) => Board = R.useWith(createNextSquares, [
  getCurrentBoardFromHistory,
  R.identity,
])
const dropHistoryElements = R.useWith(
  R.flip<number, History, History>(R.take),
  [R.identity, R.pipe(R.prop('payload'), R.add(1))],
)
const getIsNext: (state: History) => boolean = R.pipe<
  History,
  HistoryElement,
  boolean
>(R.last, R.prop('xIsNext'))
const nextXIsNext: (state: History, action: Action) => boolean = R.pipe<
  History,
  boolean,
  boolean
>(getIsNext, R.not)
const appendMoveToHistory: (
  history: History,
  action: Action,
) => History = R.converge(R.append, [
  R.applySpec({
    squares: createNextSquaresFromHistory,
    xIsNext: nextXIsNext,
  }) as any,
  R.identity,
])
export const history: (
  state: History | undefined,
  action: Action,
) => History = createReducer<History, Action>(
  [{ squares: Array(9).fill(null), xIsNext: true }],
  {
    [actions.CLICK_ON_SQUARE]: appendMoveToHistory,
    [actions.JUMP_TO_STEP]: dropHistoryElements,
  },
)
