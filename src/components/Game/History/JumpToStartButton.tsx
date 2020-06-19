import React from 'react'
import * as R from 'ramda'
import { Thunk } from './index'
import * as actions from '/helpers/actions'
export const JumpToStartButton: React.SFC<{ jumpTo: Thunk<number> }> = ({
  jumpTo,
}) => (
  <li>
    <button onClick={R.thunkify(jumpTo)(0)}>{`Go to game start`}</button>
  </li>
)
