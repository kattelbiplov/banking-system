const { create ,login} = require("../services/customer.services");

const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, password } = req.body;
  try {
    const { message } = await create({ firstName, lastName, email, phoneNumber, address, password });
    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error registering customer:", error);
    return res.status(500).json({ message: "Internal server error on registration part" });
  }
};

const loginUser = async(req,res)=>{
  const {phoneNumber, password} = req.body;
  try{
    const {message} = await login({phoneNumber, password});
    return res.status(201).json({message});
  }catch(error){
    console.log('Error on logging user',error);
    return res.status(500).json({message:'Internal server error on login part'})
  }
}
module.exports = { createCustomer, loginUser };