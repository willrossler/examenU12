import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Workout from "../components/Workout";
import { listWorkouts } from "../actions/workoutActions";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const workoutList = useSelector((state) => state.workoutList);
  const { loading, error, workouts } = workoutList;

  useEffect(() => {
    dispatch(listWorkouts);
  }, [dispatch]);

  return (
    <>
      <h1>Tillgängliga Pass</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {workouts.map((workout) => (
            <Col key={workout._id} sm={12} md={6} lg={4} xl={3}>
              <Workout workout={workout} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
