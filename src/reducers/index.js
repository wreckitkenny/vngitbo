import { combineReducers } from "redux";
import auth from "./auth";
import statistic from "./statistic";

const rootReducer = combineReducers({
  auth,
  statistic
})

export default rootReducer;