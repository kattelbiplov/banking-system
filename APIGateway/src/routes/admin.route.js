const express = require("express");
const { createCustomer,checkCustomerbyPhoneNumber,EditCustomerbyPhoneNumber } = require("../controllers/admin.controller");

const adminRouter = express.Router();

// adminRouter.post("/bulkcustomer", createCustomer);
adminRouter.get("/search-customer",checkCustomerbyPhoneNumber)
adminRouter.put("/edit-customer",EditCustomerbyPhoneNumber)
module.exports = adminRouter; 
