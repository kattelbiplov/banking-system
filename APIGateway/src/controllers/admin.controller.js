const {createBulkCustomer, checkCustomers, editCustomers} = require("../services/admin.services");

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

const checkCustomerbyPhoneNumber = async(req,res)=>{
  const {phoneNumber} = req.body;
  try{
    if(phoneNumber){
      console.log('phone number is: ',phoneNumber)
      const message = await checkCustomers({phoneNumber})
      console.log(message);

      return res.status(201).json({message});
    }else{
      console.log('phone number is not registered',phoneNumber)
    }
  }catch(error){
    console.log('Error in checkCustomer',error);
    return res.status(500).json({message:'Internal server error on checking customer'});
  }
};

const EditCustomerbyPhoneNumber = async(req,res)=>{
  const {phoneNumber,firstName,lastName,email,address}= req.body;
  try{
    if(phoneNumber){
      console.log('Phone number is', phoneNumber);
      const message = await editCustomers({phoneNumber,firstName,lastName,email,address});
      console.log(message);
    }
  }catch(error){
    console.log('Error in editing cutomer',error)
    return res.status(500).json({message:'Internal server error on editing cutomers'});
  }
}

module.exports = { createCustomer, checkCustomerbyPhoneNumber, EditCustomerbyPhoneNumber};