import Order from "../models/orderModel.js";
// asyncHandler is a middleware that is used to handle errors.
import asyncHandler from "express-async-handler";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    // Will not let the backend(app) crash
    // res.status(404).json({Error:'Error Occured'});

    // will crash the app altogether
    throw new Error("Order not found");
  }
});

// @desc    Update order to Paid
// @route   GET /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      });

    const updatedorder = await order.save();
    res.json(updatedorder);
  } else {
    // res.status(404).json({Error:'Error Occured'});
    throw new Error("Order not found");
  }
});

// @desc    Update order to Delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());

    const updatedorder = await order.save();
    res.json(updatedorder);
  } else {
    // res.status(404).json({Error:'Error Occured'});
    throw new Error("Order not found");
  }
});

// @desc    get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    get all orders
// @route   GET /api/orders
// @access  Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments({});
  const orders = await Order.find({})
    .populate("user", "id name")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
