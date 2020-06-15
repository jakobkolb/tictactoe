import { assert } from 'chai'
import reducer, { stepNumber, history } from './reducer'
import * as R from 'ramda'
import {
  createInitAction,
  createJumpAction,
  createInvalidAction,
  createClickAction,
} from './actions'
import { GameState } from 'components/Game'

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

  test('history', () => {
    assert.deepEqual(
      history(undefined, createInitAction()),
      [{ squares: Array(9).fill(null), xIsNext: true }],
      'Initial history is an array filled with null.',
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
