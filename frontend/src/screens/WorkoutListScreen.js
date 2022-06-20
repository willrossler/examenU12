import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import {
  listWorkouts,
  deleteWorkout,
  createWorkout,
} from "../actions/workoutActions.js";
import { WORKOUT_CREATE_RESET } from "../constants/workoutConstants";
const WorkoutListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workoutList = useSelector((state) => state.workoutList);
  const { loading, error, workouts } = workoutList;

  const workoutDelete = useSelector((state) => state.workoutDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = workoutDelete;

  const workoutCreate = useSelector((state) => state.workoutCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    workout: createdWorkout,
  } = workoutCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: WORKOUT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/workout/${createdWorkout._id}/edit`);
    } else {
      dispatch(listWorkouts);
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdWorkout]);

  const deleteHandler = (id) => {
    dispatch(deleteWorkout(id));
  };
  const createWorkoutHandler = () => {
    dispatch(createWorkout());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Workouts</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createWorkoutHandler}>
            {" "}
            <i className="fas fa-plus"></i>Create Workout
          </Button>
          {/* todo knappen funkar ej ovan */}
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>PASS</th>
              <th>PRICE(UTÖVARE)</th>
              <th>QTY (TIME SLOT)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id}>
                <td>{workout._id}</td>
                <td>{workout.name}</td>
                <td>${workout.price}</td>
                <td>${workout.qty}</td>

                <td>
                  <LinkContainer to={`/admin/workout/${workout._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(workout._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default WorkoutListScreen;
