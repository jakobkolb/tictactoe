import { calculateWinner, isIllegalMove } from '.'
import { assert } from 'chai'
import { PLAYERS } from 'types'
import actions, { createClickAction } from './actions'
import * as errors from './errors'
import * as R from 'ramda'

test('calculateWinner', () => {
  const X = PLAYERS.X
  const PO = PLAYERS.O
  assert.equal(
    calculateWinner(
      [
        {
          squares: [X, X, X, null, PO, PO, null, null, null, null],
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
          squares: [X, X, PO, null, PO, PO, null, X, null, null],
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
    isIllegalMove(
      {
        history: [
          {
            squares: [null, null, null, null, null, null, null, null, null],
            xIsNext: true,
          },
        ],
      },
      createClickAction(1),
    ),
    false,
    'No move on empty board is invalid.',
  )

  assert.equal(
    isIllegalMove(
      {
        history: [
          {
            squares: [
              PLAYERS.X,
              null,
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
      },
      createClickAction(0),
    ),
    true,
    'Click on occupied square is invalid.',
  )

  assert.equal(
    isIllegalMove(
      {
        history: [
          {
            squares: [
              PLAYERS.X,
              PLAYERS.X,
              PLAYERS.X,
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
      },
      createClickAction(5),
    ),
    true,
    'Click after game is won is invalid.',
  )
})
