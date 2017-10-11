import React from 'react'
// React Table
// https://react-table.js.org/#/story/readme
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
// ===> CSS doesn't work here.
// https://github.com/react-tools/react-table#installation
// ===> We should load global css in 'Old-school' way.
/*
<head>
  <meta charset='UTF-8'>
  <title>Main</title>
  <!-- React Table -->
  <link rel='stylesheet' href='../../node_modules/react-table/react-table.css'>
</head>
*/
import sorter from 'cp-tools/libcptools/node/sorter'
const SHOW_ALL = 'all'

const renderReactTableCellRenderer = (state) => {
  let data = state.dataSimpleTable
  let progressCellRenderer = (props) => {
    // console.log('progress', props)
    let value = props.value
    /*
    let row = props.row
    let index = props.index
    let viewIndex = props.viewIndex
    let original = props.original
    console.log('value', value)
    console.log('row', row) // visible columns
    console.log('index', index) // index in source data
    console.log('viewIndex', viewIndex) // visible (sorted) index in display
    console.log('original', original) // source data (contains all fields)
    */
    // draw background with gray
    // paint value rect with animation
    return <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#dadada',
        borderRadius: '2px'
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          backgroundColor: value > 66 ? '#85cc00'
            : value > 33 ? '#ffbf00'
            : '#ff2e00',
          borderRadius: '2px',
          transition: 'all .2s ease-out'
        }}
      />
    </div>
  }
  let statusRenderer = (props) => {
    let value = props.value
    let blackCircle = '\u25CF'
    // &#x25cf
    // Unicode Character 'BLACK CIRCLE' (U+25CF)
    // http://www.fileformat.info/info/unicode/char/25CF/index.htm
    return (
      <span>
        <span style={{
          color: value === 'relationship' ? '#ff2e00'
            : value === 'complicated' ? '#ffbf00'
            : '#57d500',
          transition: 'all .3s ease'
        }}>
          {blackCircle}
        </span> {
          value === 'relationship' ? 'In a relationship'
          : value === 'complicated' ? `It's complicated`
          : 'Single'
        }
      </span>
    )
  }
  let header = [{
    Header: 'Name',
    columns: [
      /*
      {
        Header: 'First Name',
        accessor: 'firstName'
      }, {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName
      }
      */
      {
        Header: 'First Name (Sorted by Length, A-Z)',
        accessor: 'firstName',
        sortMethod: sorter.sortByLength,
        maxWidth: 200
      },
      {
        Header: 'Last Name (Sorted in reverse, A-Z)',
        id: 'lastName',
        accessor: d => d.lastName,
        sortMethod: sorter.sortByReverse,
        width: 240
      }
    ]
  }, {
    Header: 'Info',
    columns: [{
      Header: 'Profile Progress',
      accessor: 'progress',
      Cell: progressCellRenderer,
      minWidth: 200
    }, {
      Header: 'Status',
      accessor: 'status',
      Cell: statusRenderer,
      width: 160,
      filterable: true,
      filterMethod: (filter, row) => {
        if (filter.value === SHOW_ALL) {
          return true
        }
        // filter.value is same as one of options
        if (filter.value === 'relationship' ||
          filter.value === 'complicated' ||
          filter.value === 'single') {
          let val = row[filter.id]
          return (val === filter.value)
        }
        return true
      },
      Filter: ({ filter, onChange }) => {
        // console.log('Filter', filter)
        // {id: 'status', value:'relationship'}
        return <select
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : SHOW_ALL}
        >
          <option value={SHOW_ALL}>Show All</option>
          <option value='relationship'>Relationship</option>
          <option value='complicated'>Complicated</option>
          <option value='single'>Single</option>
        </select>
      }
    }]
  }]
  return (
    <div>
      <ReactTable
        data={data}
        columns={header}
        defaultPageSize={10}
        defaultSorted={[
          {
            id: 'firstName',
            desc: true
          }
        ]}
        className='-striped -highlight'
        getTdProps={(state, rowInfo, column, instance) => {
          // Custom component props
          // https://react-table.js.org/#/story/custom-component-props
          return {
            onMouseEnter: (e) => {
              // state.data
              //
              // rowInfo.row
              // rowInfo.original
              // rowInfo.index
              // rowInfo.viewIndex
              //
              // column.id
              //
              // instance.props
              // instance.state
              /*
              console.log('Cell - onMouseEnter', {
                state,
                rowInfo,
                column,
                instance,
                event: e
              })
              */
            }
          }
        }}
      />
    </div>
  )
}

module.exports = {
  renderReactTableCellRenderer
}
