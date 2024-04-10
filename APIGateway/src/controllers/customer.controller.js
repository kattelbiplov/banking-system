const { create ,login, getUserProfile} = require("../services/customer.services");

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

const getUserProfileData = async (req, res) => {
  const { userId } = req.params; 
  try {
    const userProfile = await getUserProfile(userId);
    return res.status(200).json({ userProfile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error on fetching user profile" });
  }
};


module.exports = { createCustomer, loginUser, getUserProfileData };