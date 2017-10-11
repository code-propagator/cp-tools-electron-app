
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

import DataListWrapper from './DataListWrapper'
import SortHeaderCell from './SortHeaderCell'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

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

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore')
// const { TextCell } = require('./helpers/cells')
// const { Table, Column } = require('fixed-data-table-2')
// ===> broken

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
}

class MuiCompFixedDataTable extends MuiComp {
  constructor (props) {
    super(props)

    let _dataList = new FakeObjectDataListStore(30)

    let _defaultSortIndexes = []
    var size = _dataList.getSize()
    for (var index = 0; index < size; index++) {
      _defaultSortIndexes.push(index)
    }

    this.state = {
      instanceId: uuidv4(),
      defaultSortIndexes: _defaultSortIndexes,
      defaultSortedDataList: new DataListWrapper(_defaultSortIndexes, _dataList),
      sortIndexes: _defaultSortIndexes,
      sortedDataList: new DataListWrapper(_defaultSortIndexes, _dataList),
      colSortDirs: {
        // keeps current column sort status for each column here
      }
    }
    this._onSortChange = this._onSortChange.bind(this)
    this.renderTable = this.renderTable.bind(this)
  }

  componentWillUnmount () {
    console.log('MuiCompFixedDataTable will unmount')
  }

  componentDidMount () {
    console.log('MuiCompFixedDataTable did mount')
  }

  _onSortChange (columnKey, sortDir) {
    console.log('SORT KEY', columnKey, sortDir)
    // create new array by slice()
    var sortIndexes = this.state.defaultSortIndexes.slice()
    // var SortTypes = {
    //   ASC: 'ASC',
    //   DESC: 'DESC'
    // }
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this.state.defaultSortedDataList.getObjectAt(indexA)[columnKey]
      var valueB = this.state.defaultSortedDataList.getObjectAt(indexB)[columnKey]
      // console.log('sort', valueA, valueB)
      var sortVal = 0 // SAME
      if (valueA > valueB) {
        sortVal = 1 // DIFF
      }
      if (valueA < valueB) {
        sortVal = -1 // DIFF
      }
      if (sortVal !== 0 && sortDir === SortTypes.DESC) {
        sortVal = sortVal * -1 // FLIP FLAG
      }

      return sortVal
    })
    // sortedDataList as FakeObjectDataListStore
    // ---> sortedDataList as DataListWrapper
    // Both have getSize, getObjectAt, and getAll method
    this.setState({
      sortIndexes: sortIndexes,
      sortedDataList: new DataListWrapper(sortIndexes, this.state.sortedDataList),
      colSortDirs: {
        [columnKey]: sortDir
      }
    })
  }

  renderTable () {
    var {defaultSortedDataList, colSortDirs} = this.state
    // console.log(sortedDataList.getAll())
    // ---> sortedDataList itself is a {"size":2000,"_cache":[]}
    // ---> sortedDataList.getAll() returns all records in the cache
    // [..., {"id":714,"avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/robinlayfield/128.jpg","city":"Rubietown","email":"Eva84@yahoo.com","firstName":"Lynn","lastName":"Christiansen","street":"Weimann Centers","zipCode":"39335","date":"2017-06-03T17:38:37.365Z","bs":"web-enabled aggregate experiences","catchPhrase":"Seamless tertiary forecast","companyName":"Gaylord, Yost and Rohan","words":"sit quidem dolorem","sentence":"Velit soluta ut ipsum deleniti dolor voluptatibus dolores sit voluptas."}, ...]
    // let all = sortedDataList.getAll()
    // ### ==> DEFINITELY THIS CAUSES MEMORY WORKLOAD!!!
    //
    // Because we need SORTED record array, you cannot use getAll(),
    // which only returns all data created in FakeObjectDataListStore.
    let all = this.state.sortIndexes.map((index) => {
      return defaultSortedDataList.getObjectAt(index)
    })
    //
    let first = all[0]
    let keys = Object.keys(first)
    let headercols = keys.map((key, index) => {
      // console.log('key', key)
      return (
        <TableHeaderColumn key={index}>
          <SortHeaderCell
            onSortChange={this._onSortChange}
            columnKey={key}
            sortDir={colSortDirs[key]}>
            {key}
          </SortHeaderCell>
        </TableHeaderColumn>
      )
    })
    let tabletitle = 'SAMPLE TABLE'
    let tableheader = (
      <TableHeader
        displaySelectAll
        adjustForCheckbox
        enableSelectAll>
        <TableRow>
          <TableHeaderColumn
            colSpan='3'
            tooltip={tabletitle}
            style={{textAlign: 'left'}}>
            {tabletitle}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>{headercols}</TableRow>
      </TableHeader>
    )

    let tablerows = all.map((rec, indexR) => {
      // console.log('rec', rec)
      let reccols = keys.map((key, indexC) => {
        // console.log('rec[' + key + ']', rec[key])
        // ### render as STRING for now
        return (<TableRowColumn key={indexC}
          colSpan='3'
          style={{textAlign: 'left'}}>
          {JSON.stringify(rec[key])}
        </TableRowColumn>)
      })
      return (<TableRow key={indexR}>{reccols}</TableRow>)
    })
    // set deselectOnClickaway false so that selected rows not to be deselected
    // when clicking outside of the table
    let tablebody = (
      <TableBody
        preScanRows={false}
        displayRowCheckbox
        deselectOnClickaway={false}
        showRowHover={false}
        stripedRows={false}>{tablerows}</TableBody>
    )
    return <Table
      height={'300px'}
      fixedHeader
      selectable
      multiSelectable
      onCellClick={(rowNumber, columnId) => {
        // Called when a row cell is clicked. rowNumber is the row number
        // and columnId is the column number or the column key.
        // rowNumber: 0, 1, 2, ...
        // columnId: -1, 0, 1, 2, .... ### -1 means selection-checkbox column
        console.log('onCellClick', rowNumber, columnId)
      }}
      onRowSelection={(selectedRows) => {
        // http://www.material-ui.com/#/components/table
        // Called when a row is selected. selectedRows is an array of all row selections.
        // IF all rows have been selected, the string "all" will be returned instead
        // to indicate that all rows have been selected.
        if (selectedRows === 'all') {
          // selected all rows
          console.log('Selected All')
          return
        } else if (selectedRows === 'none') {
          // selected all rows
          console.log('Unselected All')
          return
        }
        console.log('Selected Rows', selectedRows)
        // [0, 71, 73, 75, 79]
      }}
    >{tableheader}{tablebody}</Table>
    // return <div>{JSON.stringify(all)}</div>
    /*
    return (
      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey='id'
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}>
              id
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={100}
        />
        <Column
          columnKey='firstName'
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.firstName}>
              First Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey='lastName'
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.lastName}>
              Last Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey='city'
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.city}>
              City
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
        <Column
          columnKey='companyName'
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.companyName}>
              Company Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={200}
        />
      </Table>
    )
    */
  }

  render () {
    // let hash = window.location.hash
    // ===> '#/muiComp'
    let table = this.renderTable()
    // https://github.com/electron/electron/issues/2538
    return (
      <div>
        <h2>MuiCompFixedDataTable:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        <h2>Material-UI Table is CRITICALLY SLOW!</h2>
        <h3>column sort clears row selections</h3>
        <h3>clicked row number varies according to sort result</h3>
        <br />
        To avoid text selection while shift + click multiple rows,
        &lt;body style="user-select:none"&gt;<br />
        is set in the index.html file.<br />
        {this.state.defaultSortIndexes}
        <hr />
        {this.state.sortIndexes}
        <hr />
        {table}
      </div>
    )
  }
}

export default MuiCompFixedDataTable
