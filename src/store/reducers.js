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
    default: return state;
  }
}

export default reducer;
