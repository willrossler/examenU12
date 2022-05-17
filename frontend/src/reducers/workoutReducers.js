import {
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
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
