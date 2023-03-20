import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, userUpdateAction } from "../actions/userActions";
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: userUpdateLoading,
    error: userUpdateError,
    success: userUpdateSuccess,
  } = userUpdate;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    if (userUpdateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      navigate("/admin/userList");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, id, user, userUpdateSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction({ _id: id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to={`/admin/userList`} className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {userUpdateLoading && <Loader />}
        {userUpdateError && (
          <Message variant="danger">{userUpdateError}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="p-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="p-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="p-2">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="m-2">
              <span className="d-flex align-items-center">
                {loading && (
                  <Spinner
                    animation="border"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "3px",
                    }}
                  />
                )}
                Update
              </span>
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
