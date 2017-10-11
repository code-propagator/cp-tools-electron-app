
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import rendererApi from '../../rendererApi'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// ===> Setting up <MuiThemeProvider muiTheme={getMuiTheme()}> is not required
// when you set it on parent. See AppRoutes.js.
// 0.19.1
import RaisedButton from 'material-ui/RaisedButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

// https://redux-form.com/7.0.4/docs/gettingstarted.md/
// import { createStore, combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import ContactForm from './ContactForm'
import InitializeFromStateForm from './InitializeFromStateForm'
import MaterialUiForm from './MaterialUiForm'

const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

/*
admin-on-rest

https://marmelab.com/admin-on-rest/

The admin-on-rest is awesome example of material-ui based app.
Unfortunately, it didn't work for latest material-ui with react.

*/

/*
https://marmelab.com/admin-on-rest//Tutorial.html

curl http://jsonplaceholder.typicode.com/posts/12
{
  'id': 12,
  'title': 'in quibusdam tempore odit est dolorem',
  'body': 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
  'userId': 2
}

### You can save the list of posts result as follows:
curl http://jsonplaceholder.typicode.com/posts > postresults.js

*/

// https://redux-form.com/7.0.4/docs/gettingstarted.md/

class MuiCompForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      received: null,
      instanceId: uuidv4(),
      refresh: 'now',
      formValue: null,
      formValue1: null,
      formValue2: null,
      formValue3: null
    }

    this.requestLatestData = this.requestLatestData.bind(this)
    this.receiver = this.receiver.bind(this)

    this.handleClick = this.handleClick.bind(this)

    this.onForceUpdate = this.onForceUpdate.bind(this)
  }

  componentWillUnmount () {
    console.log('MuiCompo will unmount')
    emitter.updateEmitter.unsubscribe(this.state.instanceId)
  }

  componentDidMount () {
    console.log('MuiComp did mount')
    emitter.updateEmitter.subscribe(this.state.instanceId, this.onForceUpdate)
  }

  requestLatestData () {
    // Request latest data
    rendererApi.callMainGet({
      type: 'getData',
      instanceId: this.state.instanceId
    }, this.receiver)
  }

  receiver (result) {
    console.log('receiver', result)
    this.setState({
      received: result,
      refresh: uuidv4()
    })
  }

  handleClick () {
    this.requestLatestData()
  }

  onForceUpdate (arg) {
    console.log('MuiComp force-update RECEIVED')
    console.log('received arg', arg)

    var obj = ReactDOM.findDOMNode(this.refs[this.state.instanceId])
    console.log('ReactDOM.findDOMNode', obj)

    this.requestLatestData()
  }

  render () {
    // let hash = window.location.hash
    // ===> '#/muiComp'

    return (
      <div ref={this.state.instanceId} >
        <h2>MuiCompForm:{this.state.instanceId}</h2>

        refresh: {this.state.refresh}<br />

        <button onClick={() => {
          rendererApi.callMainSync()
        }}>SYNC</button>

        <button onClick={() => {
          rendererApi.callMain()
        }}>ASYNC</button>

        <button onClick={this.handleClick}>DATA</button>
        <br />
        {JSON.stringify(this.state.received)}
        <hr />
        <RaisedButton label='MUI Button' />
        <hr />
        window.location: {JSON.stringify(window.location)}
        <hr />
        <h2>Redux Form</h2>
        {JSON.stringify(this.state.formValue)}
        <ContactForm onSubmit={(values) => {
          // print the form values to the console
          console.log('onSubmit', values)
          // ===> form values are automatically set
          // {email: 'ccc@dd.ee', firstName: 'AAAA', lastName: 'BBBB'}
          // ### param order varies. not form's view order.
          this.setState({formValue: values})
        }} />
        <hr />
        {JSON.stringify(this.state.formValue1)}
        <InitializeFromStateForm onSubmit={(values) => {
          console.log('onSubmit', values)
          this.setState({formValue1: values})
        }} />
        <hr />
        <h2>You can't use same form in separate way!!!</h2>
        {JSON.stringify(this.state.formValue2)}
        <InitializeFromStateForm onSubmit={(values) => {
          console.log('onSubmit', values)
          this.setState({formValue2: values})
        }} />
        <hr />
        <h2>redux-form with Material-UI including DatePicker</h2>
        {JSON.stringify(this.state.formValue3)}
        <MaterialUiForm onSubmit={(values) => {
          console.log('onSubmit', values)
          this.setState({formValue3: values})
        }} />
      </div>
    )
  }
}

export default MuiCompForm
