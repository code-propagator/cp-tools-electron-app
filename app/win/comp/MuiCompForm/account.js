// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const LOAD = 'redux-form-examples/account/LOAD'

// reducer for InitializeFromStateForm
// start with initial state {}
const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return { data: action.data }
    default:
      return state
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
 // creates action with data
export const load = data => ({
  type: LOAD, // action.type
  data // action.data
})

export default reducer
