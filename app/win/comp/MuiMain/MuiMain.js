import React, {Component} from 'react'
import MuiAppLogin from 'cp-tools/libcptools/react/MuiAppLogin'
import {VALIDATION_TYPES} from 'cp-tools/libcptools/react/MuiCompInputTextField'
import history from '../../hashHist'
import rendererApi from '../../rendererApi'

// ### npm ls react
// ### remove react in cp-tools/node_module if installed as duplicated
class MuiMain extends Component {
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
    let appBarStyle = T_RED
    let title = 'ログイン'
    const myLoginConf = {
      status: {
        login: 'ユーザIDとパスワードを入力して下さい。',
        inProgressStatus: '認証中...'
      },
      username: {
        defaultValue: 'development',
        hint: 'ユーザIDを入力',
        label: 'ユーザID',
        stringRequired: '必須',
        validationType: VALIDATION_TYPES.TYPE_REQUIRED
      },
      password: {
        defaultValue: 'password',
        hint: 'パスワードを入力',
        label: 'パスワード',
        stringRequired: '必須',
        validationType: VALIDATION_TYPES.TYPE_REQUIRED
      },
      authButtonLabel: 'ログイン'
    }
    let nextRoute = '/muiNext'
    let backRoute = '/muiMain'

    return <MuiAppLogin
      appBarStyle={appBarStyle}
      title={title}
      myLoginConf={myLoginConf}
      history={history}
      nextRoute={nextRoute}
      backRoute={backRoute}
      rendererApi={rendererApi} />
  }
}

export default MuiMain
