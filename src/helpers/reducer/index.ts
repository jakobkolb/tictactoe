import actions, { Action } from '../actions'
import * as R from 'ramda'
import { GameState } from 'types'
import { combineReducers } from 'redux'
import { isIllegalMove } from '../index'
import { stepNumber } from './stepNumber'
import { history } from './history'

const unsafeReducer = combineReducers({ history, stepNumber })

const returnState = R.nAry(1, R.identity)

const illegalClickAction = (state: GameState, action: Action): boolean => {
  if (action.type === actions.CLICK_ON_SQUARE) {
    if (isIllegalMove(state, action)) {
      return true
    }
  }
  return false
}

const reducer: (
  state: GameState | undefined,
  action: Action,
) => GameState = R.ifElse(illegalClickAction, returnState, unsafeReducer)

export default reducer
