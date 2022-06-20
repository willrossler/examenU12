import axios from "axios";
import {
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_DETAILS_REQUEST,
  WORKOUT_DETAILS_SUCCESS,
  WORKOUT_DETAILS_FAIL,
  WORKOUT_DELETE_FAIL,
  WORKOUT_DELETE_SUCCESS,
  WORKOUT_DELETE_REQUEST,
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_CREATE_RESET,
  WORKOUT_UPDATE_SUCCESS,
  WORKOUT_UPDATE_FAIL,
  WORKOUT_UPDATE_REQUEST,
} from "../constants/workoutConstants";
import { logout } from "./userActions";

export const listWorkouts = async (dispatch) => {
  try {
    dispatch({ type: WORKOUT_LIST_REQUEST });
    const { data } = await axios.get("/api/workouts");

    dispatch({
      type: WORKOUT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listWorkoutDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORKOUT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/workouts/${id}`);

    dispatch({
      type: WORKOUT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWorkout = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/workouts/${id}`, config);

    dispatch({
      type: WORKOUT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createWorkout = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/workouts`, {}, config);

    dispatch({
      type: WORKOUT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateWorkout = (workout) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/workouts/${workout._id}`,
      workout,
      config
    );

    dispatch({
      type: WORKOUT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: WORKOUT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORKOUT_UPDATE_FAIL,
      payload: message,
    });
  }
};
