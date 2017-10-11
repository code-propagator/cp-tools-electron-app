import React from 'react'
// import React, {Component, createElement} from 'react'

import ReactDOM from 'react-dom'
import rendererApi from '../../rendererApi'
import {Route} from 'react-router-dom'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// ===> Setting up <MuiThemeProvider muiTheme={getMuiTheme()}> is not required
// when you set it on parent. See AppRoutes.js.
// 0.19.1
import RaisedButton from 'material-ui/RaisedButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'
import MuiComp from '../MuiComp/MuiComp'

import dummycontents from './contents.js'
import IndentTree from 'cp-tools/libcptools/react/IndentTree'
import TreeConv from 'cp-tools/libcptools/node/TreeConv'

import history from '../../hashHist'

import ContentForTree from 'cp-tools/libcptools/react/ContentForTree'

// import MuiContent from 'cp-tools/libcptools/react/MuiContent'
// import MuiContentListAsTabs from 'cp-tools/libcptools/react/MuiContentListAsTabs'
import MuiContentListWihType, {LINKLIST_TYPES} from 'cp-tools/libcptools/react/MuiContentListWithType'
import Paper from 'material-ui/Paper'

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
const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

// ----------------------------------------------------------
// TAB ==> JSON (ARRAY)
// start with tabbed text
let text = dummycontents.tabbedText
// get tree objects as array
let obj = IndentTree.tabbedTextToObject(text)
// obj can be backed to text
let text2 = IndentTree.objectToTabbedText(obj)
console.log(text2)
// --------------------------------------------
// ROOT NODE ==> LEAVES (ARRAY)
// take first root only to traverse.
// we can get leaves name list
let leaves = IndentTree.getLeaves(obj[0])
console.log('FOUND LEAVES', leaves)
// --------------------------------------------
// ROOT NODE ==> JSON TREE
let treeRes = IndentTree.processTree(obj[0])
console.log(JSON.stringify(treeRes))
// https://github.com/gre/json-beautify
var beautify = require('json-beautify')
console.log(beautify(treeRes, null, 2, 80))
// --------------------------------------------
// ROOT NODE ==> HTML (NOT ESPACED. INCOMPLETE SAMPLE)
let render = IndentTree.renderTree(obj[0])
console.log(render)
var html = require('html')
let pretty = html.prettyPrint(render, {indent_size: 2})
console.log(pretty)
// ----------------------------------------------------------
class MuiCompTree extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4()
    }

    // let compiled = compile(demo)
    // console.log('TOC', compiled.toc)
    // console.log('TREE', compiled.tree)
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
    console.log('MuiCompTree window.location.hash', hash)

    let url = this.props.match.url
    // ===> url is undefined when you try to instanciate by hand <RouteOne />
    // ===> RouteOne needs to be loaded by Router.
    console.log('MuiCompTree match.url', url) // /muiCompTabs

    let leafs = TreeConv.getLeafs(dummycontents.sampleTree)

    // root node of the tree
    let treeNode = obj[0]

    return (
      <div>
        <h2>MuiCompTree:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        {JSON.stringify(leafs)}
        <hr />
        {JSON.stringify(treeNode)}
        <hr />
        <Grid>
          <Row>
            <Col xs>
              <Route
                path={url}
                render={props => (
                  <Paper style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    margin: '16px 32px 16px 0'
                  }} zDepth={1} >
                    <MuiContentListWihType
                      type={LINKLIST_TYPES.TYPE_TREE}
                      contents={treeNode}
                      initialIndex={0}
                      history={history} {...props} />
                  </Paper>
                )}
              />
            </Col>
            <Col xs>
              <Route
                exact path={`${url}/:contentId`}
                render={props => <ContentForTree history={history}
                  backlink={url} backtitle='MuiCompTree' contents={treeNode} {...props} />}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default MuiCompTree
