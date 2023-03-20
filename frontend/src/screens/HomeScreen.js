import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber } = useParams();

  const productList = useSelector((state) => state.productList);
  const { products, pages, page, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // console.log("products", products);

  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h3 className="py-3">Latest Products</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
            products
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
