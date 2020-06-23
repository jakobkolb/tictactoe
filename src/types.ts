export enum PLAYERS {
  X = 'X',
  O = 'O',
}
export type Board = ReadonlyArray<PLAYERS | null>

export interface HistoryElement {
  squares: Board
  xIsNext: boolean
}

export type History = ReadonlyArray<HistoryElement>
export interface GameState {
  history: History
  stepNumber: number
}

export interface Thunk<T> {
  (argument: T): void
}
