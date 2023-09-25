import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel";
// import generateToken from '../utils/generateToken.js';

// POST /api/users
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, dob, mobileNo } = req.body;

  const userExists = await Customer.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const customer = await Customer.create({
    name,
    email,
    password,
    dob,
    mobileNo,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      dob: customer.dob,
      mobileNo: customer.mobileNo,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// GET /api/users
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

// GET /api/users/:id
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// PUT /api/users/:id
const updateCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.dob = req.body.dob || customer.dob;
    customer.mobileNo = req.body.mobileNo || customer.mobileNo;

    if (req.body.password) {
      customer.password = req.body.password;
    }

    const updatedUser = await customer.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dob: updatedUser.dob,
      mobileNo: updatedUser.mobileNo,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// DELETE /api/users/:id
const deleteCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    await customer.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
