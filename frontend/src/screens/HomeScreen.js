import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Workout from "../components/Workout";
import axios from "axios";

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data } = await axios.get("/api/workouts");

      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  return (
    <>
      <h1>Tillgängliga Pass</h1>
      <Row>
        {workouts.map((workout) => (
          <Col key={workout._id} sm={12} md={6} lg={4} xl={3}>
            <Workout workout={workout} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
