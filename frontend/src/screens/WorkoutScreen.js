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
  Dropdown,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listWorkoutDetails } from "../actions/workoutActions";
import { addToCart } from "../actions/cartActions";

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
    dispatch(addToCart(workout._id, qty));
    navigate("/cart");
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
                      ? `Lediga platser${countInStock}` 
                      : "Fullbokad!..."}
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
                        {[...Array(workout.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
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
