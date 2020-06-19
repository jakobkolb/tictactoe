import React from 'react'
import { History } from 'types'
import { Thunk } from './index'

import { JumpToMoveButtons } from './JumpToMoveButtons'
import { JumpToStartButton } from './JumpToStartButton'

export const HistoryNavigation: React.SFC<{
  jumpTo: Thunk<number>
  history: History
}> = ({ jumpTo, history }) => (
  <ol>
    <JumpToStartButton jumpTo={jumpTo} />
    <JumpToMoveButtons history={history} jumpTo={jumpTo} />
  </ol>
)
