import React, {Component} from 'react'
import {Route} from 'react-router-dom'

// ### read cp-tools transpiled component in libcptools
import Content from 'cp-tools/libcptools/react/Content'
import ContentList from 'cp-tools/libcptools/react/ContentList'

import dummycontents from './contents.js'
// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
import history from '../../hashHist'

class RouteOne extends Component {
  render () {
    let url = this.props.match.url
    // ===> url is undefined when you try to instanciate by hand <RouteOne />
    // ===> RouteOne needs to be loaded by Router.
    console.log('RouteOne match.url', url)
    let contents = dummycontents
    // ContentList as a navigation
    // Content as list item
    //
    // ### Instead of locating Contents as children of the ContentList,
    // ### they are displayed at the same level of views.
    return (
      <div>
        <h2>RouteOne</h2>
        <Route
          path={url}
          render={props => <ContentList contents={contents} {...props} />}
        />
        <Route
          exact path={`${url}/:contentId`}
          render={props => <Content history={history}
            backlink={url} backtitle='RouteOne' contents={contents} {...props} />}
        />
      </div>
    )
  }
}

export default RouteOne
