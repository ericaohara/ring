import { combineReducers } from "redux";

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case "LOADING":
      return action;
    default:
      return state;
  }
};

export default combineReducers({
  loading: loadingReducer,
});
