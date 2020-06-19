import React, { useCallback } from 'react'
import * as R from 'ramda'
import * as actions from 'helpers/actions'
import { useDispatch } from 'react-redux'

export const JumpToStartButton: React.SFC = () => {
  const dispatch = useDispatch()
  const onClick = useCallback(
    R.thunkify(R.pipe(actions.createJumpAction, dispatch))(0),
    [dispatch],
  )
  return (
    <li>
      <button onClick={onClick}>{`Go to game start`}</button>
    </li>
  )
}
