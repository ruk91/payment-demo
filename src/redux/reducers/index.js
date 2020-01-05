import { ADD_DETAILS } from '../actions/index';

const initialState = {
  details: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_DETAILS:
      return {
        details: [
          ...state.details,
          {
            cardNumber: action.cardNumber,
            name: action.name,
            expiry: action.expiry,
            cvc: action.cvc,
          }
        ]
      };

    default:
      return state;
  };
}

export default rootReducer;