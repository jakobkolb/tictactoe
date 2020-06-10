import { calculateWinner } from '.'

describe('calculateWinner', () => {
  test('should return winner if she has three in line', () =>
    expect(
      calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    ).toEqual('X'))
  test('should return null, if noone has three in line', () =>
    expect(
      calculateWinner(['X', 'X', 'O', null, 'O', 'O', null, 'X', null, null]),
    ).toEqual(null))
})
