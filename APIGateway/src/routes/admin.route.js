const express = require("express");
const { createBulkCustomer } = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.post("/bulkcustomer", createBulkCustomer);

module.exports = adminRouter; 
