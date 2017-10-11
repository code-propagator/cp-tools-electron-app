import { createHashHistory } from 'history'

let history = createHashHistory()

export default history
// ### Don't this move to node_module.
// ### Invariant Violation: Hash history needs a DOM
