
import React from 'react'
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
// import { Aztec } from 'react-aztec'
import MuiComp from '../MuiComp/MuiComp'

import * as MUI from 'material-ui'
import simpleFormData from './simpleform'
import layoutFormData from './layout'

import { Grid } from 'react-flexbox-grid'
// console.log('MUI', MUI)
// console.log('simpleFormData ===> ', simpleFormData)
const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

const { Aztec } = require('cp-tools/libcptools/react/MyAztec')

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

// ###########################################
// Aztec uses bootstrap 24 column grid layout
// ###########################################

const introductionForm = [
  {
    id: 'name', // Aztec form item id
    type: 'textfield',
    props: {
      id: 'name', // textfield id
      floatingLabelText: 'Hello, Whats your name?',
      hintText: 'Name is required'
    },
    rules: {
      validation: [
        {
          rule: 'mandatory', // email, lowercase, mobile
          message: 'Name is required!!' // on error message to be displayed
        }
      ]
    },
    layout: {
      row: 1,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 6
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'name1', // Aztec form item id
    type: 'textfield',
    props: {
      id: 'name1', // textfield id
      floatingLabelText: 'Hello, Whats your name?',
      hintText: 'Name is required'
    },
    rules: {
      validation: [
        {
          rule: 'mandatory', // email, lowercase, mobile
          message: 'Name is required!!' // on error message to be displayed
        }
      ]
    },
    layout: {
      row: 1,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 6
      },
      lg: {
        col: 4
      }
    }
  },
  {
    id: 'name2', // Aztec form item id
    type: 'textfield',
    props: {
      id: 'name2', // textfield id
      floatingLabelText: 'Hello, Whats your name?',
      hintText: 'Name is required'
    },
    rules: {
      validation: [
        {
          rule: 'mandatory', // email, lowercase, mobile
          message: 'Name is required!!' // on error message to be displayed
        }
      ]
    },
    layout: {
      row: 1,
      xs: {
        col: 12
      },
      sm: {
        col: 12
      },
      md: {
        col: 6
      },
      lg: {
        col: 4
      }
    }
  }
]

class MuiCompAztec extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      // ### introductionForm
      introId: uuidv4(),
      // ### Simple Form
      formData: simpleFormData,
      response: '',
      errors: '',
      displayFormErrors: false,
      simpleFormId: 'simple-form' + uuidv4(),
      // ### layout form
      layoutId: 'layout-form' + uuidv4(),
      layoutFormData: layoutFormData
    }
  }

  componentWillUnmount () {
    console.log('MuiCompo will unmount')
  }

  componentDidMount () {
    console.log('MuiComp did mount')
  }

  render () {
    // let hash = window.location.hash
    // ===> '#/muiComp'

    // Aztec guid should be fixed unique value.
    // Don't generate it everytime render is called.
    // Aztec gathers all values for forms with guid in 'response' field.
    return (
      <div>
        <Grid>
          <h2>MuiCompAztec:{this.state.instanceId}</h2>
          <h2>super.render()</h2>
          {super.render()}
          <hr />
          <h2>Because pure Aztec used pui-react-grids, which uses global Bootstrap, <br />
          we've just replaced Aztec entry to replace it with react-flexbox-grid module.</h2>
          Note that bootstrap divies cols with 24 basis, but react-flexbox-grid with 12. <br />
          Adjust you form layout settings with new basis. <br />
          <Aztec
            guid={this.state.introId}
            data={introductionForm}
            library={MUI}
          />
          <hr />
          <h2>Simple Form</h2>
          {JSON.stringify(this.state.response)}<br />
          {JSON.stringify(this.state.errors)}<br />
          <Aztec
            guid={this.state.simpleFormId}
            data={
              /*
              introductionForm
              */
              this.state.formData
            }
            library={MUI}
            patch={{
              // 'name': 'PATCHED VALUE'
              1: 'Patched Value'
            }}
            onChange={(...args) => {
              console.log('change', args)
            }}
            displayErrors={this.state.displayFormErrors}
            formRef={(form) => {
              console.log('FORM REF', form)
              // ### For multiple forms, you should enhance this.formRef
              this.formRef = form
            }}
            onSubmit={(response, errors, formData) => {
              console.log('submit')
              console.log(response)
              // ######################################################
              // ### ==> contains ALL Aztec forms!!!
              // ### you should select only target form by hand here!!!
              let myResponse = response[this.state.simpleFormId]
              console.log(errors)
              // ### ==> If validation result is okay,
              //         we have no error with errors === [] (empty array)
              //
              // console.log(formData)
              // ######################################################
              this.setState({
                response: JSON.stringify(myResponse, null, 2),
                errors: JSON.stringify(errors, null, 2),
                formData,
                displayFormErrors: true
              })
            }}
          />
          <RaisedButton
            label='Complete Survey'
            primary
            onClick={(data) => {
              console.log(data)
              // ### For multiple forms, you should enhance this.formRef
              this.formRef.click()
            }} /><br />
          {JSON.stringify(this.state.formData)}<br />
          <hr />
          <Aztec
            guid={this.state.layoutId}
            data={this.state.layoutFormData}
            library={MUI}
            onChange={(...args) => {
              const control = args[0]
              const layoutFormData = this.state.layoutFormData
              console.log('change in layout form', args)
              if (control.type === 'textfield') {
                layoutFormData[control.id] = args[2]
              }
              this.setState({
                layoutFormData
              })
            }}
          />
        </Grid>
      </div>
    )
  }
}

export default MuiCompAztec
