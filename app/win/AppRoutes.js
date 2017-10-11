import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import Header from './comp/Header/Header'

// 0.19.1
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/customization/themes/#muithemeprovider
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
// const theme = createMuiTheme()

// https://github.com/zilverline/react-tap-event-plugin
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
// ### injectTapEventPlugin should be called only ONCE in the app.
// ### Never call this again inside other component's code.

// https://redux-form.com/7.0.4/docs/gettingstarted.md/
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import account from './comp/MuiCompForm/account'

import Home from './comp/Home'
import RouteOne from './comp/RouteOne/RouteOne'
import RouteTwo from './comp/RouteTwo/RouteTwo'
import MuiComp from './comp/MuiComp/MuiComp'
import MuiMain from './comp/MuiMain/MuiMain'
import MuiNext from './comp/MuiNext/MuiNext'
import MuiDock from './comp/MuiDock/MuiDock'
import MuiCompTabs from './comp/MuiCompTabs/MuiCompTabs'
import MuiCompTree from './comp/MuiCompTree/MuiCompTree'
import MuiCompMarksy from './comp/MuiCompMarksy/MuiCompMarksy'
import MuiCompScroller from './comp/MuiCompScroller/MuiCompScroller'
import MuiCompFixedDataTable from './comp/MuiCompFixedDataTable/MuiCompFixedDataTable'
// ### reduxForm error with react-hot-loader
// import MuiCompForm from './comp/MuiCompForm/MuiCompForm'
import MuiCompAztec from './comp/MuiCompAztec/MuiCompAztec'
import MuiCompReactTable from './comp/MuiCompReactTable/MuiCompReactTable'

let win = {}

win.links = [
  {path: '/', title: 'Home', comp: Home},
  {path: '/routeOne', title: 'RouteOne', comp: RouteOne},
  {path: '/routeTwo', title: 'RouteTwo', comp: RouteTwo},
  {path: '/muiComp', title: 'MuiComp', comp: MuiComp},
  {path: '/muiMain', title: 'MuiMain', comp: MuiMain},
  {path: '/muiNext', title: 'MuiNext', comp: MuiNext},
  {path: '/muiDock', title: 'MuiDock', comp: MuiDock},
  {path: '/muiCompTabs', title: 'MuiCompTabs', comp: MuiCompTabs},
  {path: '/muiCompTree', title: 'MuiCompTree', comp: MuiCompTree},
  {path: '/muiCompMarksy', title: 'MuiCompMarksy', comp: MuiCompMarksy},
  {path: '/muiCompScroller', title: 'MuiCompScroller', comp: MuiCompScroller},
  {path: '/muiCompFixedDataTable', title: 'MuiCompFixedDataTable', comp: MuiCompFixedDataTable},
  //{path: '/muiCompForm', title: 'MuiCompForm', comp: MuiCompForm}

  {path: '/muiCompAztec', title: 'MuiCompAztec', comp: MuiCompAztec},
  {path: '/muiCompReactTable', title: 'MuiCompReactTable', comp: MuiCompReactTable}
]

// All reducers are combined here to handle single store.
const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  account,
  form: formReducer
})
// Reduces update store data.
// When some action with data is handled in the reducer,
// store's state is updated.
const store = createStore(rootReducer)

class AppRoutes extends Component {
  /*
  https://facebook.github.io/react/docs/react-component.html

  constructor()
  componentWillMount()
  render()
  componentDidMount()
  */
  // constructor (props) {
  //   super(props)

  //  this.state = {
  //    routes: null,
  //    routeConfig: []
  //  }

    // https://gist.github.com/davidgljay/5d7a29c5add8b360b93db838235e80a8
    // https://moduscreate.com/code-splitting-for-react-router-with-es6-imports/
    //
    // ### ===> Dynamic loading components and routes didn't work!
    /*
    this.state.routeConfig = [
      {
        route: '/',
        exact: true,
        name: 'Home',
        require: './comp/Home',
        component: Home
      },
      {
        route: '/routeOne',
        exact: false,
        name: 'RouteOne',
        require: './comp/RouteOne/RouteOne',
        component: RouteOne
      },
      {
        route: 'routeTwo',
        exact: false,
        name: 'RouteTwo',
        require: './comp/RouteTwo/RouteTwo',
        component: RouteTwo
      },
      {
        route: '/muiComp',
        exact: false,
        name: 'MuiComp',
        require: './comp/MuiComp/MuiComp',
        compoennt: MuiComp
      }
    ]

    this.generateRoutes = this.generateRoutes.bind(this)
    */
  // }

  /*
  generateRoutes () {
    let keys = Object.keys(this.state.routeConfig)

    let comps = {}
    let errorLoading = (err) => {
      console.error('Dynamic page loading failed', err)
    }
    let loadRoute = (cb) => {
      console.log('laodRoute', cb)
      return (module) => {
        console.log('module', module)
        cb(null, module.default)
      }
    }
    let getComponent = (location, cb) => {
      System.import(location)
      .then(loadRoute(cb))
      .catch(errorLoading)
    }

    var path = require('path')
    var ROUTE_DIR = path.resolve(__dirname, 'app/win')

    return keys.map((key) => {
      let conf = this.state.routeConfig[key]
      console.log('conf', conf)
      console.log('require', conf.require)

      let target = path.resolve(ROUTE_DIR, conf.require)
      console.log('target', target)
      // import class
      comps[conf.name] = require(target) // .default
      // ===> ERROR
      console.log('### loaded ###', comps[conf.name])

      getComponent(target, (arg1, arg2) => {
        console.log('getComponent callback', arg1, arg2)
      })
      // ===> Can't find module
      // generate Route
      if (conf.exact === true) {
        return <Route exact path={conf.route} component={comps[conf.name]} />
      } else {
        return <Route path={conf.route} component={comps[conf.name]} />
      }

      // if (conf.exact === true) {
      //   return <Route exact path={conf.route} component={conf.component} />
      // } else {
      //   return <Route path={conf.route} component={conf.component} />
      // }
    })
  }
  */

  /*
  componentWillMount () {
    let routes = this.generateRoutes()
    console.log('routes', routes)
    this.setState({routes: routes})
  }
  */

  render () {
    let links = win.links
    console.log('AppConfig.win.links', links)

    // map undefined error on web
    let routes = links.map((elem, index) => {
      if (elem.path === '/') {
        return <Route key={index} exact path={elem.path} component={elem.comp} />
      } else {
        return <Route key={index} path={elem.path} component={elem.comp} />
      }
    })

    // MuiThemeProvider takes only one element. Wrap contents with <div>.
    let routesDisp = <div>{routes}</div>
    /*
    let routesDisp = (<div>
      <Route exact path='/' component={Home} />
      <Route path='/routeOne' component={RouteOne} />
      <Route path='/routeTwo' component={RouteTwo} />
      <Route path='/muiComp' component={MuiComp} />
      <Route path='/muiMain' component={MuiMain} />
      <Route path='/muiNext' component={MuiNext} />
      <Route path='/muiDock' component={MuiDock} />
      <Route path='/muiCompTabs' component={MuiCompTabs} />
      <Route path='/muiCompTree' component={MuiCompTree} />
      <Route path='/muiCompMarksy' component={MuiCompMarksy} />
      <Route path='/muiCompScroller' component={MuiCompScroller} />
      <Route path='/muiCompFixedDataTable' component={MuiCompFixedDataTable} />
      <Route path='/muiCompForm' component={MuiCompForm} />
      <Route path='/muiCompAztec' component={MuiCompAztec} />
      <Route path='/muiCompReactTable' component={MuiCompReactTable} />
    </div>)
    */
    // let routesDisp = this.state.routes

    // Material-UI 0.19.1
    // Provider for redux is assigned.
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Header links={links} />
            {routesDisp}
          </div>
        </MuiThemeProvider>
      </Provider>
    )
    /*
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header />
          {routesDisp}
        </div>
      </MuiThemeProvider>
    )
    */
  }
}

export default AppRoutes
