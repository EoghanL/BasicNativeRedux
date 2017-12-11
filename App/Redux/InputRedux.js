import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  enter: ['input'],
})

export const INITIAL_STATE = Immutable({
  inputList: ['Sleep']
})

export const InputTypes = Types
export default Creators

export const enterText = (state = INITIAL_STATE, action) => {
  const prevSearches = state.inputList

  return state.merge({inputList: [...prevSearches, action.input]});
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ENTER]: enterText
})
