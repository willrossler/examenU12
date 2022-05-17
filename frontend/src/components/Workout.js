import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Workout = ({ workout }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/workout/${workout._id}`}>
        <Card.Img src={workout.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/workout/${workout._id}`}>
          <Card.Title as="h4">{workout.name}</Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as="p">{workout.description}</Card.Text>
    </Card>
  );
};

export default Workout;
