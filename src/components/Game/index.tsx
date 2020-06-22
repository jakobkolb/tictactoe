import React from 'react'
import { GameBoard } from './Board'
import { HistoryNavigation } from './History'
import { Index } from './Status'

export const Game: React.SFC = () => (
  <div className="game">
    <div className="game-board">
      <GameBoard />
    </div>

    <div className="game-info">
      <Index />
      <HistoryNavigation />
    </div>
  </div>
)
