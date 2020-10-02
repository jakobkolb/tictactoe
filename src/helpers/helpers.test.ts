import { calculateWinner, isIllegalMove, getStatus } from '.'
import { assert } from 'chai'
import { PLAYERS } from 'types'
import actions, { createClickAction, createInitAction } from './actions'
import * as errors from './errors'
import * as R from 'ramda'
import reducer from './reducer'

test('calculateWinner', () => {
  const X = PLAYERS.X
  const PO = PLAYERS.O
  assert.equal(
    calculateWinner(
      [
        {
          squares: [X, X, X, null, PO, PO, null, null, null],
          xIsNext: false,
        },
      ],
      { type: actions.JUMP_TO_STEP },
    ),
    'X',
    'should return winner if she has three in line',
  )
  assert.equal(
    calculateWinner(
      [
        {
          squares: [X, null, PO, null, X, PO, null, null, X],
          xIsNext: false,
        },
      ],
      { type: actions.JUMP_TO_STEP },
    ),
    'X',
    'should return winner if she has three in line',
  )
  assert.equal(
    calculateWinner(
      [
        {
          squares: [X, X, PO, null, PO, PO, null, X, null],
          xIsNext: false,
        },
      ],
      { type: actions.JUMP_TO_STEP },
    ),
    null,
    'should return null, if noone has three in line',
  )
})

test('isLegalMove', () => {
  assert.throws(
    R.thunkify(isIllegalMove)(undefined, createClickAction(1)),
    errors.ILLEGAL_STATE_ERROR,
    'Clicking on empty state is not allowed.',
  )
  assert.equal(
    isIllegalMove(reduceActions([]), createClickAction(1)),
    false,
    'No move on empty board is invalid.',
  )

  assert.equal(
    isIllegalMove(reduceActions([createClickAction(0)]), createClickAction(0)),
    true,
    'Click on occupied square is invalid.',
  )

  assert.equal(
    isIllegalMove(
      reduceActions(R.map(createClickAction, [0, 3, 1, 4, 2])),
      createClickAction(5),
    ),
    true,
    'Click after game is won is invalid.',
  )
})

test('getStatus', () => {
  assert.equal(
    getStatus(reduceActions([])),
    `Next player: ${PLAYERS.X}`,
    'Indicate that X has the first move',
  )
  assert.equal(
    getStatus(reduceActions([createClickAction(1)])),
    `Next player: ${PLAYERS.O}`,
    'Indicate that O has the second move',
  )
  assert.equal(
    getStatus(reduceActions(R.map(createClickAction, [0, 3, 1, 4, 2]))),
    `Winner: ${PLAYERS.X}`,
    'Indicate winner if she has three in line',
  )

  assert.equal(
    getStatus(reduceActions(R.map(createClickAction, [8, 0, 3, 1, 4, 2]))),
    `Winner: ${PLAYERS.O}`,
    'Indicate winner if she has three in line',
  )
})

const reduceActions: (actionList: Action[]) => GameState = (actionList) => {
  return R.reduce(reducer, undefined, [
    createInitAction(),
    ...actionList,
  ]) as GameState
}
