import React from 'react'
// import React, {Component, createElement} from 'react'

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
import MuiComp from '../MuiComp/MuiComp'

// Grid for Material-UI 0.19.1
// Next version of Material-UI (1.0.0) provides own Grid class.
// However, new Material-UI needs new setup configiration for projects!
// ==> It needs troublesome tuning...
import { Grid, Row, Col } from 'react-flexbox-grid'
/*
// Because the react-flexbox-grid uses internally CSS files.
// The webpack should be able to load CSS for this.
// Install loaders, then set up webpack config of module loaders.
// ===> npm install --save-dev css-loader style-loader
{
  test: /\.css$/,
  loaders: [ 'style-loader', 'css-loader?modules' ]
}
*/
import {List, ListItem} from 'material-ui/List'

// https://github.com/cerebral/marksy
import marksy from 'marksy'

import TabKeyTextArea from 'cp-tools/libcptools/react/TabKeyTextArea'
const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

// -------------------------------------------
// https://github.com/cerebral/marksy
// Sample text to be compiled on the fly
const demo = `
# Some blog title

It seems Material-UI doesn't work with marksy.
GUI components are reduced to the simple html stuffs.
===> dangerouslySetInnerHTML is used as inner html dom element.

\`\`\`js
const foo = "bar"
\`\`\`

<RRR>
  <COL>Replacing Text</COL>
  <COL>Take care of tag name</COL>
  <BUTTON>PUSH</BUTTON>
  <LIST>
    <LISTITEM>ITEM</LISTITEM>
  </LIST>
</RRR>
`

// Compile rule is described here.

// For components, dangerouslySetInnerHTML is used to render.
// ===> It's not ordinal rendering for Material-UI components.
// ===> DON element is generated
/*
// https://facebook.github.io/react/docs/dom-elements.html
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
*/
const compile = marksy({
  createElement: React.createElement,
  components: {
    ROW (props) {
      return <Row {...props}>{props.children}</Row>
    },
    COL (props) {
      return <Col xs {...props}>{props.children}</Col>
    },
    BUTTON (props) {
      return <RaisedButton label={props.children} {...props} />
    },
    LIST (props) {
      return <List {...props}>{props.children}</List>
    },
    LISTITEM (props) {
      return <ListItem primaryText={props.children} {...props} />
    }
  }
})

// ----------------------------------------------------------
class MuiCompMarksy extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      initialIndex: 1, // 0, 1, 2, ...
      tree: compile(demo).tree,
      value: demo
    }

    // let compiled = compile(demo)
    // console.log('TOC', compiled.toc)
    // console.log('TREE', compiled.tree)

    // this.onTextareaChange = this.onTextareaChange.bind(this)
  }

  /*
  onTextareaChange (event) {
    this.setState({
      tree: compile(event.target.value).tree,
      value: event.target.value
    })
  }
  */

  onTabKeyTextAreaChange (text) {
    this.setState({
      tree: compile(text).tree,
      value: text
    })
  }

  componentWillUnmount () {
    console.log('MuiCompTree will unmount')
  }

  componentDidMount () {
    console.log('MuiCompTree did mount')
  }

  render () {
    let hash = window.location.hash
    // ===> '#/muiComp'
    console.log('MuiCompMarksy window.location.hash', hash)

    let url = this.props.match.url
    // ===> url is undefined when you try to instanciate by hand <RouteOne />
    // ===> RouteOne needs to be loaded by Router.
    console.log('MuiCompTabs match.url', url) // /muiCompTabs

    const textareaStyle = {
      width: '100%',
      height: '500px',
      border: '1px dashed #DADADA',
      outline: 'none',
      padding: '10px',
      boxSizing: 'border-box',
      resize: 'none',
      fontSize: '0.8em'
    }

    return (
      <div>
        <h2>MuiCompTree:{this.state.instanceId}</h2>
        <Grid>
          <Row>
            <Col xs>
              <h2>marksy -- markdown to component</h2>
              {/*
                // Ordinal textarea cannot handle tab key input as text input.
                // It just move focus to other GUIs.
                // TabKeyTextArea catches tab key.
              */}
              <TabKeyTextArea style={textareaStyle}
                onChangeCallback={(text) => this.onTabKeyTextAreaChange(text)}
                text={this.state.value} />
            </Col>
            <Col xs>
              <div style={{
                width: '50%',
                verticalAlign: 'top',
                display: 'inline-block',
                padding: '0 20px'
              }}>
                {this.state.tree}
              </div>
            </Col>
          </Row>
        </Grid>
        <hr />
        <h2>super.render()</h2>
        {super.render()}
      </div>
    )
  }
}

export default MuiCompMarksy
