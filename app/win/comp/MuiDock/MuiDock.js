
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import rendererApi from '../../rendererApi'
import MuiComp from '../MuiComp/MuiComp'

import history from '../../hashHist'

import AppBar from 'material-ui/AppBar'

// 0.19.1
import FlatButton from 'material-ui/FlatButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

import Drawer from 'material-ui/Drawer'
import ClickOutside from 'cp-tools/libcptools/react/ClickOutside'
import { BottomSheet } from 'material-ui-bottom-sheet'

// 0.19.1
// import Subheader from 'material-ui/Subheader'

const emitter = require('cp-tools/libcptools/node/emitter')
let uuidv4 = require('uuid/v4')

class MuiDock extends MuiComp {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      backRoute: null,
      leftDrawerIsOpen: false,
      rightDrawerIsOpen: false,

      openBottomSheet: false,
      canCloseBottomSheet: false // set ButtonSheet cannot close by default

    }

    this.setLeftDrawerOpen = this.setLeftDrawerOpen.bind(this)
    this.setRightDrawerOpen = this.setRightDrawerOpen.bind(this)
    this.allowCloseBottomSheet = this.allowCloseBottomSheet.bind(this)
  }

  allowCloseBottomSheet () {
    console.log('ALLOW CLOSE BOTTOMSHEET')
    this.setState({
      canCloseBottomSheet: true
    })
  }

  componentWillUnmount () {
    console.log('MuiDock will unmount')
    console.log('history in MuiDock', history)
  }

  componentDidMount () {
    console.log('MuiDock did mount')
    console.log('history in MuiDock', history)

    // ### pushed value inside the MuiCompLogin is received in the location parameter.
    let location = history.location
    // let pathname = location.pathname // '/muiNext'
    // let search = location.search // '?dummy=anyway'
    if (!location) return
    let state = location.state // {backRoute: '/muiMain'}
    if (!state) return
    let backRoute = state.backRoute
    if (!backRoute) return
    this.setState({backRoute: backRoute})
  }

  setLeftDrawerOpen (flag) {
    this.setState({leftDrawerIsOpen: flag})
  }

  setRightDrawerOpen (flag) {
    this.setState({rightDrawerIsOpen: flag})
  }

  onClickAppBarLeftButton () {
    this.setLeftDrawerOpen(true)
  }

  onClickAppBarBackButton () {
    history.push(this.state.backRoute)
  }

  onClickAppBarRightButton () {
    this.setState({rightDrawerIsOpen: true})
  }

  render () {
    /*
    const T_WHITE = {backgroundColor: '#ffffff'}
    const T_LIGHT_GRAY = {backgroundColor: '#cccccc'}
    const T_MEDIUM_GRAY = {backgroundColor: '#999999'}
    const T_DARK_GRAY = {backgroundColor: '#666666'}
    const T_VERY_DARK_GRAY = {backgroundColor: '#333333'}
    const T_BLACK= {backgroundColor: '#000000'}
    */
    const T_RED = {backgroundColor: '#cc0000'}
    let appBar = {
      style: T_RED,
      title: 'DOCK',
      backButtonLabel: 'CLOSE',
      rightBarButtonLabel: 'TOOL'
    }
    const appBarButtonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    }

    // onClick or onTouchTap
    // https://stackoverflow.com/questions/43879126/onclick-vs-ontouchtap-what-should-i-use
    // ==> Use onClick for normal use. Think onTouchTap for iOS.
    return (
      <div ref={this.state.instanceId} >
        <h2>MuiDock:{this.state.instanceId}</h2>
        <AppBar
          style={{...appBar.style}}
          title={
            <div>
              {appBar.title}
            </div>
          }
          onLeftIconButtonTouchTap={this.onClickAppBarLeftButton.bind(this)}
          iconElementRight={<div>
            <FlatButton label={appBar.backButtonLabel}
              onClick={this.onClickAppBarBackButton.bind(this)}
              style={{...appBarButtonStyle}} />
            <FlatButton label={appBar.rightBarButtonLabel}
              onClick={this.onClickAppBarRightButton.bind(this)}
              style={{...appBarButtonStyle}} />
          </div>}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.leftDrawerIsOpen}
          onRequestChange={(open) => this.setState({leftDrawerIsOpen: open})}
        >
          <AppBar title='LEFT' showMenuIconButton={false} />
        </Drawer>

        <FlatButton
          label='Toggle Right Drawer'
          onClick={() => {
            this.setState({rightDrawerIsOpen: !this.state.rightDrawerIsOpen})
          }}
        />

        <Drawer
          docked={false}
          width={600}
          openSecondary
          open={this.state.rightDrawerIsOpen} >
          <ClickOutside clickedInOrOut={
            (e, isOutside) => {
              console.log('clickInOrOut on RIGHT:', isOutside)
              if (isOutside === true) {
                // Close the drawer.
                this.setRightDrawerOpen(false)
              }
            }
          }>
            <AppBar title='RIGHT' showMenuIconButton={false} />
          </ClickOutside>
        </Drawer>

        <FlatButton
          label='Open Bottom Sheet'
          onClick={() => {
            // set cannot close right now
            this.state.canCloseBottomSheet = false
            // Because the OUTSIDE click event is generated here,
            // set tha flag to avoid it
            // open sheet
            this.setState(
              {openBottomSheet: true}, () => {
                setTimeout(this.allowCloseBottomSheet.bind(this), 500)
              })
          }}
        />
        <hr />
        <FlatButton label='Back' onClick={() => {
          history.push(this.state.backRoute)
        }} />
        <BottomSheet ref='buttomSheet'
          open={this.state.openBottomSheet}
          onRequestClose={(e) => {}} >
          <ClickOutside
            clickedInOrOut={(e, isOutside) => {
              console.log('clickInOrOut on BOTTOMSHEET:', isOutside)
              if (isOutside === true) {
                // OUTSIDE
                if (this.state.canCloseBottomSheet === true) {
                  this.setState({openBottomSheet: false})
                } else {
                  console.log('NOT ALLOWED CLOSING BOTTOMSHEET RIGHT NOW')
                }
              } else {
                // INSIDE
                console.log('INSIDE BOTTOMSHEET')
              }
            }}>
            <div>
              {/* <Subheader>BOTTOM</Subheader><br /> */}
              <h2>BOTTOM</h2><br />
            </div>
          </ClickOutside>
        </BottomSheet>
        <hr />
        <h2>super.render()</h2>
        {super.render()}
      </div>
    )
  }
}

export default MuiDock
