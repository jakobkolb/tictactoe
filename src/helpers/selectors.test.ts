import { GameState, PLAYERS, History, HistoryElement } from 'types'
import {
  getCurrentBoardFromState,
  getCurrentBoardFromHistory,
} from './selectors'
import * as R from 'ramda'
import { assert } from 'chai'
import { stepNumber } from './reducer'

test('getCurrentBoardFromHistory', () => {
  const state: History = [
    {
      squares: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
    },
    {
      squares: [PLAYERS.X, null, null, null, null, null, null, null, null],
      xIsNext: false,
    },
    {
      squares: [PLAYERS.X, PLAYERS.O, null, null, null, null, null, null, null],
      xIsNext: true,
    },
  ]
  assert.deepEqual(
    getCurrentBoardFromHistory(state),
    [PLAYERS.X, PLAYERS.O, null, null, null, null, null, null, null],
    'Returns squares of last history element.',
  )
})

test('getCurrentBoardFromState', () => {
  const state: GameState = {
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
      {
        squares: [PLAYERS.X, null, null, null, null, null, null, null, null],
        xIsNext: false,
      },
      {
        squares: [
          PLAYERS.X,
          PLAYERS.O,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        xIsNext: true,
      },
    ],
    stepNumber: 2,
  }
  assert.deepEqual(
    getCurrentBoardFromState(state),
    [PLAYERS.X, PLAYERS.O, null, null, null, null, null, null, null],
    'Return squares of last history Element in GameState.',
  )
})
