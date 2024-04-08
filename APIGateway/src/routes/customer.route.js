const express = require("express");
const { createCustomer, loginUser } = require("../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.post("/register", createCustomer);
customerRouter.post("/login",loginUser);

module.exports = { customerRouter };