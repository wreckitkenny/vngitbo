// Components
import {
    GET_STATISTIC_SUCCESS,
    GET_STATISTIC_FAILED,
    SET_MESSAGE,
    LOGOUT
} from "../constants/types";
import StatisticService from "../services/statistic";

// eslint-disable-next-line
export const statistic = (token) => (dispatch) => {
  return StatisticService.statistic(token).then(
    (data) => {
      dispatch({
        type: GET_STATISTIC_SUCCESS,
        payload: {
          stat: data
        },
      });
      return Promise.resolve();
    },
    (error) => {
      if (error.response.status === 401) {
        dispatch({
          type: LOGOUT,
        });
        return Promise.reject();
      }

      dispatch({
        type: GET_STATISTIC_FAILED,
      });

      return Promise.reject();
    }
  );
};