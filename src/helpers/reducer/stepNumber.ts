import actions, { Action } from '../actions'

export const stepNumber: (
  state: number | undefined,
  action: Action,
) => number = (state = 0, action) => {
  if (action.type === actions.JUMP_TO_STEP) {
    return action.payload
  }
  if (action.type === actions.CLICK_ON_SQUARE) {
    return state + 1
  }
  return state
}
