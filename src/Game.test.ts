import { calculateWinner } from './Game'

describe('calculate Winner', () => {
  test('should return winner if she has three in line', () => {
    expect(
      calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    ).toEqual('X')
  })
})
