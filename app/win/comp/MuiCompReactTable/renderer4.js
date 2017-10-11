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

import RTR from 'cp-tools/libcptools/react/ReactTableRenderer'

const renderReactTable = (comp, state, fetchData) => {
  // comp is caller (MuiCompReactTable)
  // state is comp.state
  // fetchData is comp.fetchData, which retrieves data for current page to display
  let progressCellRenderer = (props) => {
    let progressColor = (v) => {
      return v > 66 ? '#85cc00'
        : v > 33 ? '#ffbf00'
        : '#ff2e00'
    }
    return RTR.doRenderProgress(props, progressColor)
  }
  let editableRenderer = (cellInfo) => {
    return RTR.doRenderEditableText(comp, state, fetchData, cellInfo)
  }
  let checkboxEditableRenderer = (cellInfo) => {
    return RTR.doRenderEditableCheckbox(comp, state, fetchData, cellInfo)
  }
  let statusRenderer = (cellInfo) => {
    let selections = [
      {value: 'relationship', label: 'RelationShip'},
      {value: 'complicated', label: 'Complicated'},
      {value: 'single', label: 'Single'}
    ]
    return RTR.doRenderDropdownMenu(comp, state, fetchData, cellInfo, selections)
  }
  let dateRenderer = (cellInfo) => {
    return RTR.doRenderDatePicker(comp, state, fetchData, cellInfo)
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
        Header: '',
        id: 'check',
        accessor: 'check',
        Cell: checkboxEditableRenderer,
        width: 30,
        sortable: false,
        filterable: false
      },
      {
        Header: 'date',
        id: 'date',
        accessor: 'date',
        Cell: dateRenderer,
        width: 120,
        sortable: true, // you need Date sorter
        filterable: false
      },
      {
        Header: 'dateString',
        id: 'dateString',
        accessor: d =>
          <div style={{marginTop: '10px'}}>
            {JSON.stringify(d.date)}
          </div>,
        width: 240,
        sortable: false,
        filterable: false
      },
      {
        Header: 'First Name (Sorted by Length, A-Z)',
        id: 'firstName', // ### add id for server-side sort
        accessor: 'firstName',
        Cell: editableRenderer,
        // sortMethod: sortByLength, // ### invalid for 'server-side' fetch
        // maxWidth: 200,
        width: 200
      },
      {
        Header: 'Last Name (Sorted in reverse, A-Z)',
        id: 'lastName',
        // accessor: d => d.lastName,
        accessor: d =>
          <div style={{marginTop: '10px'}}>
            {d.lastName}
          </div>,
        // sortMethod: sortByReverse, // ### invalid for 'server-side' fetch
        width: 240
      },
      {
        Header: 'Full Name',
        id: 'full',
        accessor: d =>
          <div style={{marginTop: '10px'}}
            dangerouslySetInnerHTML={{
              __html: d.firstName + ' ' + d.lastName
            }}
          />,
        // filtering and sorting for a custom field are not implemented by default.
        // add some features in request.js for server-side like fetch
        width: 400,
        sortable: false,
        filterable: false
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
        // ###
        // THIS METHOD IS NEVER CALLED WHEN YOU USE SERVER-SIDE LIKE FETCH
        // ===> DO FILTER IN REQUEST DATA METHOD YOU PROVIDE IN request.js
        // ###
        if (filter.value === RTR.SHOW_ALL) {
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
        let statusOptions = [
          {value: RTR.SHOW_ALL, text: 'Show All'},
          {value: 'relationship', text: 'Relationship'},
          {value: 'complicated', text: 'Complicated'},
          {value: 'single', text: 'Single'}
        ]
        return RTR.doRenderFilterOptions(filter, onChange, statusOptions)
      }
    }]
  }]
  // count in CURRENT PAGE (NOT WHOLE DATA LENGTH)
  let countInPage = 0
  if (state.data !== null && state.data !== []) {
    countInPage = state.data.length
  }
  // console.log('### data', state.data)
  // console.log('### count', count)
  // https://react-table.js.org/#/story/readme
  // page and pageSize can make all data in one page
  return (
    <div>
      Count in current Page: {countInPage}<br />
      All count: {state.countAll}<br />
      <ReactTable
        data={state.data}
        noDataText='No data so far.'
        columns={header}
        pageSizeOptions={[5, 10, 20, 25, 50, 100, 1000]}
        defaultPageSize={20}
        showPaginationTop
        showPaginationBottom={false}
        style={{
          height: '600px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        pages={state.pages} // Display the total number of pages
        loading={state.loading} // Display the loading overlay when we need it
        onFetchData={fetchData} // Request new data when things change
        filterable
        defaultSorted={[{
          id: 'firstName',
          desc: true
        }]}
        className='-striped -highlight'
        getTrProps={(state, rowInfo, column) => {
          // console.log('getTrProps', state, rowInfo, column)
          if (!rowInfo) {
            return {}
          }
          if (!rowInfo.row) {
            return {}
          }
          if (!rowInfo.row.status) {
            return {}
          }
          return {
            style: {
              height: '60px', // ### ristrict row height
              background: rowInfo.row.status === 'single' ? 'aquamarine' : null
            }
          }
        }}
        getTdProps={(state, rowInfo, column, instance) => {
          // Custom component props
          // https://react-table.js.org/#/story/custom-component-props
          return {
            // style: {marginTop: '10px'},
            onClick: (e, handleOriginal) => {
              // https://react-table.js.org/#/story/readme
              console.log('A Td Element was clicked!')
              console.log('it produced this event:', e)
              console.log('It was in this column:', column)
              console.log('It was in this row:', rowInfo)
              console.log('It was in this table instance:', instance)
              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal()
              }
            },
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
        /*
        SubComponent={row => {
          return (
            <div style={{padding: '20px'}}>
              sub component {JSON.stringify(row)}
            </div>
          )
        }}
        */
      />
    </div>
  )
}

module.exports = {
  renderReactTable
}
