import React from 'react'
import { Dispatch } from 'redux'
import * as actions from 'helpers/actions'
import { Thunk } from 'types'
import { connect } from 'react-redux'

export interface JumpToMoveButtonOwnProps {
  move: number
}

interface JumpToMoveButtonDispatchProps {
  onClick: Thunk<unknown>
}

interface JumpToMoveProps
  extends JumpToMoveButtonOwnProps,
    JumpToMoveButtonDispatchProps {}

const JumpToMoveButtonComponent: React.SFC<JumpToMoveProps> = ({
  move,
  onClick,
}) => (
  <li>
    <button onClick={onClick}>{`Go to move # ${move}`}</button>
  </li>
)
const mapDispatchToProps = (
  dispatch: Dispatch,
  { move }: JumpToMoveButtonOwnProps,
): JumpToMoveButtonDispatchProps => ({
  onClick: (): void => dispatch(actions.createJumpAction(move)),
})
export const JumpToMoveButton = connect(
  undefined,
  mapDispatchToProps,
)(JumpToMoveButtonComponent)
