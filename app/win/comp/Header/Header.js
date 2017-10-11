import React, {Component} from 'react'

import LinkList from 'cp-tools/libcptools/react/LinkList'

class Header extends Component {
  /*
  constructor (props) {
    super(props)

    this.state = {
      links: []
    }

    this.state.links = [
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/routeOne',
        title: 'RouteOne'
      },
      {
        path: '/routeTwo',
        title: 'RouteTwo'
      },
      {
        path: '/muiComp',
        title: 'MuiComp'
      },
      {
        path: '/muiMain',
        title: 'MuiMain'
      },
      {
        path: '/muiDock',
        title: 'MuiDock'
      },
      {
        path: '/muiCompTabs',
        title: 'MuiCompTabs'
      },
      {
        path: '/muiCompTree',
        title: 'MuiCompTree'
      },
      {
        path: '/muiCompMarksy',
        title: 'MuiCompMarksy'
      },
      {
        path: '/muiCompScroller',
        title: 'MuiCompScroller'
      },
      {
        path: '/muiCompFixedDataTable',
        title: 'MuiCompFixedDataTable'
      },
      {
        path: '/muiCompForm',
        title: 'MuiCompForm'
      },
      {
        path: '/muiCompAztec',
        title: 'MuiCompAztec'
      },
      {
        path: '/muiCompReactTable',
        title: 'MuiCompReactTable'
      }
    ]
  }
  */

  render () {
    /*
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/routeOne'>RouteOne</Link></li>
    <li><Link to='/routeTwo'>RouteTwo</Link></li>
    <li><Link to='/muiComp'>MuiComp</Link></li>
    */
    return (
      <div>
        <h2>Header</h2>
        <LinkList links={this.props.links} />
      </div>
    )
  }
}

export default Header
