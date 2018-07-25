import * as actionTypes from './actions';

const initialState = {
  merchants: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_MERCHANT:
    return {
      ...state,
      merchants: state.merchants.concat(action.payload)
    }
    case actionTypes.REMOVE_MERCHANT:
    return {
      ...state,
      merchants: state.merchants.filter(merchant => merchant.id !== action.payload)
    }
    case actionTypes.UPDATE_MERCHANT:
    const elem = state.merchants.find( item => item.id === action.payload.id )
    const index = state.merchants.indexOf(elem)
    const arr = [...state.merchants]
    arr.splice(index, 1, action.payload)
    return {
      ...state,
      merchants: arr
    }
    default: return state;
  }
}

export default reducer;
