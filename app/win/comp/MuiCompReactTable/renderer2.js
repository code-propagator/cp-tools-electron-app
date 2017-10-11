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
const renderReactSimpleTable = (state) => {
  let data = state.dataSimpleTable
  let header = state.flatHeader ? [
    {
      Header: 'First Name',
      accessor: 'firstName'
    },
    {
      Header: 'Last Name',
      id: 'lastName', // assign id for object accessor
      accessor: d => d.lastName // return as object value
    },
    {
      Header: 'Age',
      accessor: 'age'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Visits',
      accessor: 'visits'
    }
  ] : [
    // group columns
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName'
        },
        {
          Header: 'Last Name',
          id: 'lastName',
          accessor: d => d.lastName
        }
      ]
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Age',
          accessor: 'age'
        },
        {
          Header: 'Status',
          accessor: 'status'
        }
      ]
    },
    {
      Header: 'Stats',
      columns: [
        {
          Header: 'Visits',
          accessor: 'visits'
        }
      ]
    }
  ]

  return (
    <div>
      <ReactTable
        data={data}
        columns={header}
        defaultPageSize={10}
        className='-striped -highlight'
      />
    </div>
  )
}

module.exports = {
  renderReactSimpleTable
}
