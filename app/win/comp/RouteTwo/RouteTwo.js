
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import rendererApi from '../../rendererApi'
const emitter = require('cp-tools/libcptools/node/emitter')
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
// 11 asynchronous-reply listeners added. Use emitter.setMaxListeners() to increase limit

let uuidv4 = require('uuid/v4')

class RouteTwo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blog: null,
      instanceId: uuidv4(),
      update: 'now'
    }
    this.receiver = this.receiver.bind(this)
  }

  componentWillUnmount () {
    console.log('RouteTwo will unmount')
    // https://nodejs.org/api/events.html
    // emitter.updateEmitter.setMaxListeners(Math.max(emitter.updateEmitter.getMaxListeners() - 1, 0))
    let ue = emitter.updateEmitter
    ue.unsubscribe(this.state.instanceId)
  }

  componentDidMount () {
    console.log('RouteTwo did mount')

    // emitter.updateEmitter.setMaxListeners(emitter.updateEmitter.getMaxListeners() + 1)
    // ===> ERROR
    // ### See MuiComp to handle emitter in better way.
    let ue = emitter.updateEmitter
    ue.subscribe(this.state.instanceId, (arg) => {
      console.log('RouteTwo updateEmitter force-update RECEIVED')
      let instanceId = arg
      console.log('received arg', instanceId)
      console.log('this.state.instanceId', this.state.instanceId)

      var obj = ReactDOM.findDOMNode(this.refs[this.state.instanceId])
      console.log('ReactDOM.findDOMNode', obj)
      // ===> <div></div>
      // obj.forceUpdate() // ERROR
      // obj.setState({update: 'now'}) // ERROR
      // Randomly change the state
      this.setState(
        {update: uuidv4()},
        () => {
          // Need latest values of Realm data. Just call fetch request 'getBlog'
          rendererApi.callMainGet({type: 'getBlog'}, this.receiver)
        }
      )
    })
  }

  receiver (result) {
    console.log('---> REACT COMPONENT receiver', result)

    this.setState({
      blog: result
    })
    // ERROR tyring sort objects here in the Realm way here.
    // RealmObject type is detected simpley as Object.
    /*
    this.setState({
      blog: {
        Post: blog.Post.sorted('timestamp', true),
        User: blog.User.sorted('created_at', true)
      }
    })
    // ===> sorted function is not found for Object type.
    */
  }

  render () {
    return (
      <div ref={this.state.instanceId} >
        <h2>RouteTwo:{this.state.instanceId}</h2>
        update: {this.state.update}<br />
        <button onClick={() => {
          let res = rendererApi.callMainSync()
          this.setState({blog: res})
        }}>SYNC</button>

        <button onClick={() => {
          rendererApi.callMain('FROM REACT COMPONENT', (result) => {
            this.setState({
              blog: result
            })
          })
        }}>ASYNC</button>

        <button onClick={() => {
          // Request latest data
          rendererApi.callMainGet({type: 'getBlog'}, this.receiver)
        }}>DATA</button>
        <br />
        {JSON.stringify(this.state.blog)}
      </div>
    )
  }
}

export default RouteTwo
