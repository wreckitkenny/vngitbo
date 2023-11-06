import jwt from 'jwt-decode';
// eslint-disable-next-line
// Components
import {
    GET_STATISTIC_SUCCESS,
    GET_STATISTIC_FAILED
} from "../constants/types";
import StatisticService from "../services/statistic";

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
      dispatch({
        type: GET_STATISTIC_FAILED,
      });
      return Promise.reject();
    }
  );
};