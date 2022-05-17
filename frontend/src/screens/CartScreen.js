import React, { useEffect, useDispatch } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workoutId = params.id;

  useEffect(() => {
    if (workoutId) {
      dispatch(addToCart(workoutId));
    }
  });

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <Message>
          Your cart is empty. <Link to="/">Go back</Link>
        </Message>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>
                <Image fluid rounded />
              </Col>
              <Col md={3}></Col>
              <Col md={2}>$</Col>
              <Col md={2}>
                <Form.Control
                  className="form-select"
                  as="select"
                ></Form.Control>
              </Col>
              <Col md={2}>
                <Button type="button" variant="light">
                  <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Total items in cart (</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block">
                Procceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
