import actions, { Action } from './actions'
import * as R from 'ramda'
import { GameState, HistoryElement } from 'components/Game'
import { calculateWinner, getCurrentBoardFromState } from 'helpers'
import { combineReducers } from 'redux'
import { PLAYERS } from 'types'

export const stepNumber: (
  state: number | undefined,
  action: Action,
) => number = (state = 0, action) => {
  if (action.type === actions.JUMP_TO_STEP) {
    return action.payload
  }
  if (action.type === actions.CLICK_ON_SQUARE) {
    return action.payload++
  }
  return state
}

export const history: (
  state: HistoryElement[] | undefined,
  action: Action,
) => HistoryElement[] = (
  state = [{ squares: Array(9).fill(null), xIsNext: true }],
  action,
) => {
  if (action.type === actions.CLICK_ON_SQUARE) {
    const current = R.last(state)

    const xIsNext = current.xIsNext
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[action.index]) {
      return state
    }
    squares[action.index] = xIsNext ? PLAYERS.X : PLAYERS.O
    return state.concat([
      {
        squares: squares,
        xIsNext: !xIsNext,
      },
    ])
  }
  return state
}

const unsafeReducer = combineReducers({ stepNumber, history })

const reducer: (state: GameState | undefined, action: Action) => GameState = (
  state,
  action,
) => {
  if (action.type === actions.CLICK_ON_SQUARE) {
    if (!state) {
      throw new Error('Cannot reduce CLICK ON SQUARE action on empty state!')
    }
    if (isLegalMove(state, action.payload)) {
      return unsafeReducer(state, action)
    }
    return state
  }
  return {
    history: history(!state ? undefined : state.history, action),
    stepNumber: stepNumber(
      !state ? undefined : R.prop('stepNumber')(state),
      action,
    ),
  }
}

const isLegalMove = (state: GameState, squareNumber: number): boolean => {
  const squares = getCurrentBoardFromState(state)
  if (calculateWinner(squares) || squares[squareNumber]) {
    return false
  }
  return true
}

export default reducer
