export const ILLEGAL_STATE_ERROR = 'Illegal state'

export const throwIllegalStateError = () => {
  throw new Error(ILLEGAL_STATE_ERROR)
}
