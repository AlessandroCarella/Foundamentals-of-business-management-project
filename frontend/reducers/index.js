// reducers/index.js
import { combineReducers } from 'redux';


// Example reducer
const dataReducer = ( state = {} , action) => {
  switch (action.type) {
    case 'INITIALIZE_MEANVALUES':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: dataReducer,
  // Add more reducers as needed
});

export default rootReducer;
