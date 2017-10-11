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

const renderReactTable = () => {
  let rec = {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23
    }
  }
  const data = []
  for (var k = 0; k < 100; k++) {
    data.push(rec)
  }
  let ageCellRenderer = (props) => {
    return <span className='number'>{Number(props.value)}</span>
  }
  const columns = [
    {
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    },
    {
      Header: 'Age',
      accessor: 'age',
      Cell: ageCellRenderer
      // Custom cell components! ===> affects all cells on this column
    },
    {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    },
    {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }
  ]

  return <ReactTable
    data={data}
    columns={columns}
    defaultPageSize={10}
    className='-striped -highlight'
  />
}

module.exports = {
  renderReactTable
}
