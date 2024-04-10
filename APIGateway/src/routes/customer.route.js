const express = require("express");
const { createCustomer, loginUser, getUserProfileData } = require("../controllers/customer.controller");

const customerRouter = express.Router();

customerRouter.post("/register", createCustomer);
customerRouter.post("/login",loginUser);
customerRouter.get('/profile/:userId', getUserProfileData);


module.exports = { customerRouter };