import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listWorkoutDetails, updateWorkout } from "../actions/workoutActions";
import { WORKOUT_UPDATE_RESET } from "../constants/workoutConstants";

const WorkoutEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const workoutId = params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const workoutDetails = useSelector((state) => state.workoutDetails);
  const { loading, error, workout } = workoutDetails;

  const workoutUpdate = useSelector((state) => state.workoutUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = workoutUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: WORKOUT_UPDATE_RESET });
      navigate("/admin/workoutlist");
    } else {
      if (!workout || !workout.name || workout._id !== workoutId) {
        dispatch(listWorkoutDetails(workoutId));
      } else {
        setName(workout.name);
        setPrice(workout.price);
        setImage(workout.image);
        setDescription(workout.description);
        setCountInStock(workout.countInStock);
      }
    }
  }, [dispatch, workoutId, workout, successUpdate]);

  const uploadFileHandler = async (e) => {
    console.log("test");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateWorkout({
        _id: workoutId,
        name,
        description,
        price,
        countInStock,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/admin/workoutlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Workout</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                id="image-file"
                label="Choose File"
                custom
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default WorkoutEditScreen;
