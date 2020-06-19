import React from 'react'
import * as R from 'ramda'
import { History, Thunk } from 'types'
import * as actions from 'helpers/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface JumpToMoveButtonOwnProps {
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

export const JumpToMoveButtons: React.SFC<{
  history: History
}> = ({ history }) => (
  <>
    {R.times(
      (counter: number) => (
        <JumpToMoveButton key={counter} move={counter + 1} />
      ),
      history.length - 1,
    )}
  </>
)
