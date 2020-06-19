import React from 'react'
import * as R from 'ramda'
import { GameState, History } from 'types'
import { JumpToMoveButton } from './JumpToMoveButton'
import { connect } from 'react-redux'

interface JumpToMoveButtonsOwnProps {
  history: History
}

interface JumpToMoveButtonsDispatchProps {}

interface JumpToMoveButtonsProps
  extends JumpToMoveButtonsOwnProps,
    JumpToMoveButtonsDispatchProps {}

const JumpToMoveButtonsComponent: React.SFC<JumpToMoveButtonsProps> = ({
  history,
}) => (
  <>
    {R.times(
      (counter: number) => (
        <JumpToMoveButton key={counter} move={counter + 1} />
      ),
      history.length - 1,
    )}
  </>
)

const mapStateToProps: (
  state: GameState,
) => JumpToMoveButtonsProps = R.applySpec<JumpToMoveButtonsProps>({
  history: R.prop('history'),
})

export const JumpToMoveButtons = connect(
  mapStateToProps,
  undefined,
)(JumpToMoveButtonsComponent)
