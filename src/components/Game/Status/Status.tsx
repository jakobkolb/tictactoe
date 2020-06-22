import React from 'react'
import { GameState } from 'types'
import * as R from 'ramda'
import { getStatus } from '../../../helpers'
import { connect } from 'react-redux'

interface StatusProps {
  status: string
}

const StatusComponent: React.SFC<StatusProps> = ({ status }) => (
  <div className="status">{status}</div>
)

const mapStateToProps: (state: GameState) => StatusProps = R.applySpec({
  status: getStatus,
})

export const Status = connect(mapStateToProps)(StatusComponent)
