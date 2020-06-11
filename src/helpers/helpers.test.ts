import { calculateWinner } from '.'
import { assert } from 'chai'
test('calculateWinner', () => {
  assert.equal(
    calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    'X',
    'should return winner if she has three in line',
  )
  assert.equal(
    calculateWinner(['X', 'X', 'O', null, 'O', 'O', null, 'X', null, null]),
    null,
    'should return null, if noone has three in line',
  )
})
