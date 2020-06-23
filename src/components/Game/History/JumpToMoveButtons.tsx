import React from 'react'
import * as R from 'ramda'
import { GameState, History } from 'types'
import { JumpToMoveButton } from './JumpToMoveButton'
import { connect } from 'react-redux'

export interface StateProps {
  history: History
}

type Props = StateProps

const JumpToMoveButtonsComponent: React.SFC<Props> = ({ history }) => (
  <>
    {R.times(
      (counter: number) => (
        <JumpToMoveButton key={counter} move={counter + 1} />
      ),
      history.length - 1,
    )}
  </>
)

const mapStateToProps: (state: GameState) => StateProps = R.applySpec<
  StateProps
>({
  history: R.prop('history'),
})

export const JumpToMoveButtons = connect(mapStateToProps)(
  JumpToMoveButtonsComponent,
)
