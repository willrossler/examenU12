import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listWorkoutDetails } from "../actions/workoutActions";

const WorkoutScreen = () => {
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const workoutDetails = useSelector((state) => state.workoutDetails);
  const { loading, error, workout } = workoutDetails;

  useEffect(() => {
    dispatch(listWorkoutDetails(params.id));
  }, [params]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                  <strong>Måndagar, Onsdagar, Fredagar:</strong>
                </Col>
              </ListGroupItem>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {workout.countInStock > 0
                      ? "Lediga platser"
                      : "fullbokad!..."}
                  </Col>
                </Row>
              </ListGroup.Item> */}
              {workout.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Tid</Col>
                    <Col>
                      <Form.Control
                        className="form-select"
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        <option>06:00-07:00</option>
                        <option>11:00-12:00</option>
                        <option>17:00-18:00</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroupItem>
                <p>{workout.description}</p>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  disabled={workout.countInStock === 0}
                >
                  Boka nu
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card></Card>
          </Col>
        </Row>
      )}

      <Link className="btn btn-info my-3" to="/">
        Tillbaka
      </Link>
    </>
  );
};

export default WorkoutScreen;
