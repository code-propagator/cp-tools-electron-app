
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
import Toggle from 'material-ui/Toggle'
import MuiComp from '../MuiComp/MuiComp'

import { makeData } from './Utils'
import MuiReactTable from './MuiReactTable'

// data for React Table example
const rawData = makeData()

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
// --------------------
const requester = require('./request')

const renderer = require('./renderer')
const renderer2 = require('./renderer2')
const renderer3 = require('./renderer3')
const renderer4 = require('./renderer4')

// --------------------
class MuiCompReactTable extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),

      dataSimpleTable: rawData,
      toggled: false,
      flatHeader: false,
      // for ReactTable instance (FOR SINGLE INSTANCE ONLY)
      data: [], // ### DATA IN CURREANT PAGE (MEANS NOT ENTIRE DATA)
      pages: null, // number of pages
      countAll: 0, // number of records in source (MEANS ENTIRE DATA COUNT)
      loading: true,
      useSorty: true
    }
    this.renderReactTable = this.renderReactTable.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillUnmount () {
    console.log('MuiCompReactTable will unmount')
  }

  componentDidMount () {
    console.log('MuiCompReactTable did mount')
  }

  renderReactTable () {
    return renderer.renderReactTable()
  }

  renderReactSimpleTable () {
    return renderer2.renderReactSimpleTable(this.state)
  }

  renderReactTableCellRenderer () {
    return renderer3.renderReactTableCellRenderer(this.state)
  }

  renderReactTableCellRendererSS () {
    return renderer4.renderReactTable(this, this.state, this.fetchData)
  }

  fetchData (state, instance) {
    console.log('### fetchData for ReactTable instance', state, instance)
    // state is same as instance.state
    //
    // console.log('### instance', instance)
    // instance is a ReactTable object
    // instance.state.data contains records in current page only
    // instance.state.pages --> number of pages
    // instance.state.page --> current page index (starts with 0)
    // instance.state.pageSize --> current page size (max rows in page)
    // instance.state.sortedData --> sorted data for current page

    // Whenever the table model changes, or the user sorts or changes pages,
    // this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true
    // to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true }) // ### this.state is the state of the class, not a ReactTable's one
    // Request the data however you want.  Here, we'll use our mocked service we created earlier.
    // data is retrived via Promise outside of the component class
    // ### FETCH FOR DATA FOR CURRENT PAGE
    let searchConf = {
    }
    requester.requestData(
      // ### params from ReactTable's state
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered,
      // ### useSorty flag is defined in MuiCompReactTable
      this.state.useSorty,
      searchConf
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        countAll: res.countAll,
        loading: false
      })
    })
  }

  render () {
    // let hash = window.location.hash
    // ===> '#/muiComp'

    return (
      <div>
        <h2>MuiCompReactTable:{this.state.instanceId}</h2>
        <h2>super.render()</h2>
        {super.render()}
        <hr />
        <h2>React Table</h2>
        NOTE: The react-table.css is globally loaded in the index.html! <br />
        {this.renderReactTable()}
        <hr />
        <Toggle
          label='Flat Header'
          toggled={this.state.toggled}
          onToggle={(event, isInputChecked) => {
            this.setState({
              toggled: isInputChecked,
              flatHeader: isInputChecked
            })
          }}
        />
        {this.renderReactSimpleTable()}
        <hr />
        {this.renderReactTableCellRenderer()}
        <hr />
        <h2>server-side like fetch</h2>
        Try shift+click to toggle sort header: asc, desc, none. (3 states!) <br />
        Also multi-columns sort is possible, just shift+click toggle on other headers! <br />
        <Toggle
          label='Use sorty'
          toggled={this.state.useSorty}
          onToggle={(event, isInputChecked) => {
            console.log('useSorty', isInputChecked)
            this.setState({
              useSorty: isInputChecked
            })
          }}
        />
        {this.renderReactTableCellRendererSS()}
        <hr />
        <MuiReactTable makeCount={100} />
        <hr />
        <MuiReactTable makeCount={1000} />
      </div>
    )
  }
}

export default MuiCompReactTable
