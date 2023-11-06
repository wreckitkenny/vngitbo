// Components
import {
    GET_STATISTIC_SUCCESS,
    GET_STATISTIC_FAILED
} from "../constants/types";

const stat = JSON.parse(localStorage.getItem("statistic"));

const initialState = stat
  ? { stat }
  : { stat: null };

const statisticReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STATISTIC_SUCCESS:
      return {
        ...state,
        stat: payload.stat,
      };
    case GET_STATISTIC_FAILED:
      return {
        ...state,
        stat: null,
      };
    default:
      return state;
  }
};

export default statisticReducer;