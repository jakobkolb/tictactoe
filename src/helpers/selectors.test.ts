import { GameState, PLAYERS, History, HistoryElement } from 'types'
import { Action } from './actions'
import {
  getCurrentBoardFromState,
  getCurrentBoardFromHistory,
  getStepNumber,
  getXIsNext,
} from './selectors'
import * as R from 'ramda'
import { assert } from 'chai'
import { createClickAction, createInitAction } from './actions'
import reducer from './reducer'

test('getStepNumber', () => {
  const state = reduceActions([createClickAction(1), createClickAction(2)])
  assert.equal(getStepNumber(state), 2, 'Get step number from state')
})

test('getXIsNext', () => {
  assert.equal(getXIsNext(reduceActions([])), true, 'First move is on X')
  assert.equal(
    getXIsNext(reduceActions([createClickAction(1)])),
    false,
    'Second move is on O',
  )
  assert.equal(
    getXIsNext(reduceActions([createClickAction(1), createClickAction(2)])),
    true,
    'Third move is on X again',
  )
})

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
  const state = reduceActions([createClickAction(0), createClickAction(1)])
  assert.deepEqual(
    getCurrentBoardFromState(state),
    [PLAYERS.X, PLAYERS.O, null, null, null, null, null, null, null],
    'Return squares of last history Element in GameState.',
  )
})

const reduceActions: (actionList: Action[]) => GameState = (actionList) => {
  return R.reduce(reducer, undefined, [
    createInitAction(),
    ...actionList,
  ]) as GameState
}
