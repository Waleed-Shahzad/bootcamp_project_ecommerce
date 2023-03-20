import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  products,
  orders,
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) =>
          products ? (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productslist/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ) : (
            orders && (
              <LinkContainer
                key={x + 1}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/orderlist/${x + 1}`
                }
              >
                <Pagination.Item active={x + 1 === page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            )
          )
        )}
      </Pagination>
    )
  );
};

export default Paginate;
