import React from 'react'
import { History } from 'types'

import { JumpToMoveButtons } from './JumpToMoveButtons'
import { JumpToStartButton } from './JumpToStartButton'

export const HistoryNavigation: React.SFC<{
  history: History
}> = ({ history }) => (
  <ol>
    <JumpToStartButton />
    <JumpToMoveButtons history={history} />
  </ol>
)
