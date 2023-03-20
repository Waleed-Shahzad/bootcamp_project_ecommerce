import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row xl="12" lg="12" md="10" sm="8" xs="8">
          <Col xl="8" lg="6" md="8" sm="6" xs="6" className="mr-3">
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Products..."
              className="mr-sm-2 ml-sm-5"
            ></Form.Control>
          </Col>
          <Col xl="2" lg="3" md="2" sm="2" xs="2" className="ml-3">
            <Button type="submit" variant="outline-success" className="p-2">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Searchbox;
