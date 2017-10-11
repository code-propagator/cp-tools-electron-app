
import React, {Component} from 'react'

import Toggle from 'material-ui/Toggle'

let uuidv4 = require('uuid/v4')
// --------------------
const requester = require('./request')
const renderer4 = require('./renderer4')
// --------------------
class MuiReactTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
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

  renderReactTable () {
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
      instanceId: this.state.instanceId,
      makeCount: this.props.makeCount
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
    return (
      <div ref={this.state.instanceId} >
        <h2>MuiReactTable:{this.state.instanceId}</h2>
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
        {this.renderReactTable()}
      </div>
    )
  }
}

export default MuiReactTable
