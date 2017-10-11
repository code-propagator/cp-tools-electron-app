import React, {Component} from 'react'
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
import history from '../../hashHist'

import Content from 'cp-tools/libcptools/react/Content'
import ContentList from 'cp-tools/libcptools/react/ContentList'

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

class MuiCompTabs extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      initialIndex: 1, // 0, 1, 2, ...
      contents: dummycontents
    }
  }

  componentWillUnmount () {
    console.log('MuiCompTabs will unmount')
  }

  componentDidMount () {
    console.log('MuiCompTabs did mount')

    // call initial route
    console.log('INITIAL INDEX', this.state.initialIndex)
    let url = this.props.match.url
    let path = `${url}/${this.state.initialIndex}`
    console.log('INITIAL ITEM', url, path)

    let obj = this.state.contents[this.state.initialIndex]
    console.log('INITIAL ITEM', path, obj)
    history.push({
      pathname: path,
      search: '?dummy=anyway',
      state: {
        path: path,
        title: obj.linktitle,
        index: obj.content
      }
    })
  }

  render () {
    let hash = window.location.hash
    // ===> '#/muiComp'
    console.log('MuiCompTabs window.location.hash', hash)

    let url = this.props.match.url
    // ===> url is undefined when you try to instanciate by hand <RouteOne />
    // ===> RouteOne needs to be loaded by Router.
    console.log('MuiCompTabs match.url', url)
    let contents = this.state.contents

    // ### You can place Routes inside this component.
    // ### Route objects for same route can exist okay.
    //
    // ==> As you can see the following trial code,
    // Tabs can be positioned below the contents. (It means Bottom Tabs!)

    // Set the initially selected index for Tabs, Menu, ...
    let initialIndex = this.state.initialIndex

    return (
      <div>
        <h2>MuiCompTabs:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        {/* HTML LIST */}
        <Route
          path={url}
          render={props => <ContentList contents={contents} {...props} />}
        />
        <Route
          exact path={`${url}/:contentId`}
          render={props => <Content history={history}
            backlink={url} backtitle='MuiCompTabs' contents={contents} {...props} />}
        />
        {/* TABS */}
        <Route
          path={url}
          render={props => (
            <MuiContentListWihType
              type={LINKLIST_TYPES.TYPE_TABS}
              contents={contents}
              initialIndex={initialIndex}
              history={history} {...props} />
            )}
        />
        <Grid>
          <Row>
            <Col xs={2}>
              {/* MENU */}
              <Route
                path={url}
                render={props => (
                  <Paper style={{
                    textAlign: 'left',
                    display: 'inline-block',
                    margin: '16px 32px 16px 0'
                  }} zDepth={1} >
                    <MuiContentListWihType
                      type={LINKLIST_TYPES.TYPE_MENU}
                      contents={contents}
                      initialIndex={initialIndex}
                      history={history} {...props} />
                  </Paper>
                )}
              />
            </Col>
            <Col xs={10}>
              <Route
                exact path={`${url}/:contentId`}
                render={props => <Content history={history}
                  backlink={url} backtitle='MuiCompTabs' contents={contents} {...props} />}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default MuiCompTabs
