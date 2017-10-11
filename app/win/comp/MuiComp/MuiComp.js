
import React from 'react'
import rendererApi from '../../rendererApi'
import RouteTwo from '../RouteTwo/RouteTwo'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// ===> Setting up <MuiThemeProvider muiTheme={getMuiTheme()}> is not required
// when you set it on parent. See AppRoutes.js.
// 0.19.1
import RaisedButton from 'material-ui/RaisedButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

let uuidv4 = require('uuid/v4')

class MuiComp extends RouteTwo {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      data: null // result of getDdata
    }
  }
  render () {
    return (
      <div>
        <h2>MuiComp:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        <hr />
        <RaisedButton
          label='MUI Button'
          onClick={() => {
            // Request latest data
            rendererApi.callMainGet(
              {
                type: 'getData',
                instanceId: this.state.instanceId
              },
              (result) => {
                console.log('---> REACT COMPONENT receiver', result)
                this.setState({
                  data: result
                })
              }
            )
          }} />
        <br />
        {JSON.stringify(this.state.data)}
        <hr />
      </div>
    )
  }
}

export default MuiComp
