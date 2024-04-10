const {createBulkCustomer} = require("../services/admin.services");

const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, password } = req.body;
  try {
    const { message } = await createBulkCustomer({ firstName, lastName, email, phoneNumber, address, password });
    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error registering customer:", error);
    return res.status(500).json({ message: "Internal server error on registration part" });
  }
};



module.exports = { createCustomer};