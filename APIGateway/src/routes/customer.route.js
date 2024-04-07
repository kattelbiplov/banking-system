const express = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);

module.exports = { customerRouter };