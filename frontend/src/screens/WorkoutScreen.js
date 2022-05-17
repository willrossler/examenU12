import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";

const WorkoutScreen = () => {
  const [workout, setWorkout] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchWorkout = async () => {
      const { data } = await axios.get(`/api/workouts/${params.id}`);

      setWorkout(data);
    };
    fetchWorkout();
  }, []);

  const addToCartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={workout.image} alt={workout.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{workout.name}</h2>
              <Col>
                <h4>Tillgänglig:</h4>
                Måndagar, Onsdagar, Fredagar:
              </Col>
            </ListGroupItem>

            <ListGroupItem>
              <p>{workout.description}</p>
            </ListGroupItem>
            <ListGroupItem>
              <Button onClick={addToCartHandler}>Boka nu</Button>
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card></Card>
        </Col>
      </Row>
      <Link className="btn btn-info my-3" to="/">
        Tillbaka
      </Link>
    </>
  );
};

export default WorkoutScreen;
