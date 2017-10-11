
import React from 'react'
import ReactDOM from 'react-dom'
import rendererApi from '../../rendererApi'
import MuiComp from '../MuiComp/MuiComp'

// 0.19.1
import RaisedButton from 'material-ui/RaisedButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

import history from '../../hashHist'

const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

class MuiNext extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      backRoute: null
    }
  }

  componentWillUnmount () {
    console.log('MuiNext will unmount')
    console.log('history in MuiNext', history)
  }

  componentDidMount () {
    console.log('MuiNext did mount')
    console.log('history in MuiNext', history)

    // ### pushed value inside the MuiCompLogin is received in the location parameter.
    let location = history.location
    // let pathname = location.pathname // '/muiNext'
    // let search = location.search // '?dummy=anyway'
    if (!location) return
    let state = location.state // {backRoute: '/muiMain'}
    if (!state) return
    let backRoute = state.backRoute
    if (!backRoute) return
    this.setState({backRoute: backRoute})
  }

  render () {
    return (
      <div>
        <h2>MuiCompNext:{this.state.instanceId}</h2>
        <RaisedButton label='Back' onClick={() => {
          console.log('this.state.backRoute', this.state.backRoute)
          history.push(this.state.backRoute)
        }} />
        <hr />
        <h2>super.render()</h2>
        {super.render()}
      </div>
    )
  }
}

export default MuiNext
