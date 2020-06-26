import * as R from 'ramda'
export type Action = any

const actions = {
  INIT: '@@INIT',
  JUMP_TO_STEP: 'JUMP_TO_STEP',
  INVALID: 'INVALID',
  CLICK_ON_SQUARE: 'CLICK',
}

export const createInitAction = R.always({ type: actions.INIT })

export const createJumpAction: (stepNumber: number) => Action = R.applySpec({
  type: R.always(actions.JUMP_TO_STEP),
  payload: R.identity,
})

export const createInvalidAction: () => Action = R.applySpec({
  type: R.always(actions.INVALID),
})

export const createClickAction: (squareIndex: number) => Action = R.applySpec({
  type: R.always(actions.CLICK_ON_SQUARE),
  payload: R.identity,
})

export default actions
