
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
import MuiComp from '../MuiComp/MuiComp'

import MuiScrollList from 'cp-tools/libcptools/react/MuiScrollList'
import { Grid, Row, Col } from 'react-flexbox-grid'

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
  "id": 12,
  "title": "in quibusdam tempore odit est dolorem",
  "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
  "userId": 2
}

### You can save the list of posts result as follows:
curl http://jsonplaceholder.typicode.com/posts > postresults.js

*/

const AVERAGE_ELEMENT_HEIGHT = 60
const CONTAINER_HEIGHT = AVERAGE_ELEMENT_HEIGHT * 5

class MuiCompScroller extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      received: null,
      instanceId: uuidv4(),
      refresh: 'now',

      dataArr: [],
      averageElementHeight: AVERAGE_ELEMENT_HEIGHT,
      containerHeight: (AVERAGE_ELEMENT_HEIGHT * 6)
    }
    this.fetchData = this.fetchData.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.onClickRow = this.onClickRow.bind(this)
  }

  componentWillUnmount () {
    console.log('MuiCompo will unmount')
  }

  componentDidMount () {
    console.log('MuiComp did mount')
  }

  count () {
    var count = 0
    if (this.state.dataArr === undefined) {
      count = 0
    } else {
      count = this.state.dataArr.length
    }
    return count
  }

  // ### For scroller's callback
  fetchData () {
    var newDataArr = []

    let src = []
    for (var k = 0; k < 100000; k++) {
      src.push({
        value: String('aaa' + k)
      })
    }

    src.map((rec) => {
      newDataArr.push({
        height: AVERAGE_ELEMENT_HEIGHT,
        info: rec // put as object
      })
    })

    this.setState({dataArr: newDataArr})
  }

  _getTappedRowNumber (evt) {
    let target = evt.target
    console.log(target.constructor.name)
    if (!target) return -1

    let cls = target.getAttribute('class')
    if (!cls) return -1

    let estimate = cls.match(this.state.instanceId + 'rowNumberClassSTART(.*)rowNumberClassEND')
    console.log('WATCH', estimate)
    if (!estimate) return -1
    if (estimate == null) return

    let rowNumber = -1
    try {
      rowNumber = Number(estimate[1])
    } catch (err) {
      return -1
    }
    return rowNumber
  }

  // callback for scroller
  onClickRow (evt) {
    let rowNumber = this._getTappedRowNumber(evt)
    console.log('ROW NUMBER', rowNumber)

    var data = this.state.dataArr[rowNumber]
    console.log('data', data)
    if (!data) return

    var info = data.info
    console.log('info', info)
  }

  // callback for scroller
  renderRow (rowNumber) {
    const heightOfRow = this.state.dataArr[rowNumber].height
    let data = this.state.dataArr[rowNumber]
    let text = JSON.stringify(data.info)
    let value = JSON.stringify(data.info.value)

    let rowNumberClass = String(this.state.instanceId + 'rowNumberClassSTART' + rowNumber + 'rowNumberClassEND')
    // if you add some components on the item,
    // the clicked target would be vary according to the clicked point
    let disp = (
      <Grid className={rowNumberClass} fluid>
        <Row className={rowNumberClass}>
          <Col className={rowNumberClass} xs={6}>[{rowNumber}](H:{heightOfRow}):{text}</Col>
          <Col className={rowNumberClass} xsOffset={4} xs={2}>{value}</Col>
        </Row>
      </Grid>
    )

    let colorbar = <div className={rowNumberClass}
      style={{
        width: '200px',
        height: '7px',
        background: 'yellow'
      }} />
    return (
      <div className={rowNumberClass} style={{ height: AVERAGE_ELEMENT_HEIGHT }}>
        {disp}
        {colorbar}
      </div>
    )
  }

  render () {
    // let hash = window.location.hash
    // ===> '#/muiComp'
    const averageElementHeight = AVERAGE_ELEMENT_HEIGHT
    const containerHeight = CONTAINER_HEIGHT

    return (
      <div>
        <h2>MuiCompScroller:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        <RaisedButton label='Data' onClick={() => {
          // Call MuiScrollList to update.
          this.refs[this.state.instanceId + 'scroll'].refreshData()
        }} />
        <br />
        <MuiScrollList
          ref={this.state.instanceId + 'scroll'}
          dataArr={this.state.dataArr}
          fetchData={this.fetchData}
          averageElementHeight={averageElementHeight}
          containerHeight={containerHeight}
          renderRow={this.renderRow}
          onClickRow={this.onClickRow}
          showRefreshButton />
      </div>
    )
  }
}

export default MuiCompScroller
