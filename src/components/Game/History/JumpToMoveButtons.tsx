import React from 'react'
import * as R from 'ramda'
import { History } from 'types'
import { Thunk } from './index'

const JumpToMoveButton: React.SFC<{ move: number; jumpTo: Thunk<number> }> = ({
  move,
  jumpTo,
}) => (
  <li>
    <button onClick={R.thunkify(jumpTo)(move + 1)}>{`Go to move # ${
      move + 1
    }`}</button>
  </li>
)
export const JumpToMoveButtons: React.SFC<{
  history: History
  jumpTo: Thunk<number>
}> = ({ jumpTo, history }) => (
  <>
    {R.times(
      (move: number) => (
        <JumpToMoveButton key={move} jumpTo={jumpTo} move={move} />
      ),
      history.length - 1,
    )}
  </>
)
