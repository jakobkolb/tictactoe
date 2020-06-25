import { assert } from 'chai'
import reducer from './index'
import * as R from 'ramda'
import {
  createInitAction,
  createJumpAction,
  createInvalidAction,
  createClickAction,
  Action,
} from '../actions'
import { PLAYERS } from 'types'
import { stepNumber } from './stepNumber'
import { createNextSquares, history } from './history'

describe('Reducers', () => {
  test('stepNumber', () => {
    assert.equal(
      stepNumber(undefined, createInitAction()),
      0,
      'Initial state is zero.',
    )
    assert.equal(
      stepNumber(2, createJumpAction(1)),
      1,
      'Jumps from step two to one.',
    )
    assert.equal(
      stepNumber(2, createInvalidAction()),
      2,
      'Does not change state on invalid action.',
    )
  })

  test('createNextSquares', () => {
    assert.deepEqual(createNextSquares(undefined, createClickAction(0)), [
      PLAYERS.X,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ])
  })

  test('history', () => {
    const reduceWithHistory = reduceActionsWith(history)
    assert.deepEqual(
      reduceWithHistory([]),
      [{ squares: Array(9).fill(null), xIsNext: true }],
      'Initial history is an array filled with null.',
    )
    assert.deepEqual(
      reduceWithHistory([createClickAction(1)]),
      [
        { squares: Array(9).fill(null), xIsNext: true },
        {
          squares: [null, PLAYERS.X, null, null, null, null, null, null, null],
          xIsNext: false,
        },
      ],
      'After one move, the move for X is recorded and it is Os turn.',
    )

    assert.deepEqual(
      reduceWithHistory([createClickAction(1), createJumpAction(0)]),
      [{ squares: Array(9).fill(null), xIsNext: true }],
      'Jump to beginning clears history.',
    )
  })

  test('reducer', () => {
    assert.deepInclude(
      R.reduce(reducer, undefined, [createInitAction(), createClickAction(1)]),
      { stepNumber: 1 },
      'After one move step number is one.',
    )
    assert.deepInclude(
      R.reduce(reducer, undefined, [
        createInitAction(),
        createClickAction(1),
        createClickAction(1),
      ]),
      { stepNumber: 1 },
      'Second Click on Field is Ignored.',
    )
  })
})

const reduceActionsWith = R.curry(
  (
    reducer: (state: any, action: Action) => any,
    actions: ReadonlyArray<Action>,
  ): any => R.reduce(reducer, undefined, [createInitAction(), ...actions]),
)
