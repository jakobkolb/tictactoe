import React from 'react'

import { JumpToMoveButtons } from './JumpToMoveButtons'
import { JumpToStartButton } from './JumpToStartButton'

export const HistoryNavigation: React.SFC = () => (
  <ol>
    <JumpToStartButton />
    <JumpToMoveButtons />
  </ol>
)
