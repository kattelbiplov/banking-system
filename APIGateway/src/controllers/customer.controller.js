const { create } = require("../services/customer.services");

const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, password } = req.body;
  try {
    const { message } = await create({ firstName, lastName, email, phoneNumber, address, password });
    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error registering customer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCustomer };