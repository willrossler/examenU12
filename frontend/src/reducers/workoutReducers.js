import {
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_DETAILS_REQUEST,
  WORKOUT_DETAILS_SUCCESS,
  WORKOUT_DETAILS_FAIL,
} from "../constants/workoutConstants";

export const workoutListReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case WORKOUT_LIST_REQUEST:
      return { loading: true, workouts: [] };
    case WORKOUT_LIST_SUCCESS:
      return { loading: false, workouts: action.payload };
    case WORKOUT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutDetailsReducer = (
  state = { workout: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case WORKOUT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case WORKOUT_DETAILS_SUCCESS:
      return { loading: false, workout: action.payload };
    case WORKOUT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
