const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');
async function insertUser(firstName, lastName, email, phoneNumber, address, password) {
  try {
    console.log("user data: ",firstName, lastName, email, phoneNumber, address, password)
    const sql = `INSERT INTO Customers (firstName, lastName, email, phoneNumber, address, password) VALUES (?,?,?,?,?,?)`;
    const values = [firstName, lastName, email, phoneNumber, address, password];
    const connection  =  await connectDB();
    const [result] = await connection.query(sql, values);
    return result;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw new Error('Error inserting user: ' + error.message);
  }
}
async function authenticateUser(phoneNumber,password){
  try{
    const connection = await connectDB();
    const [user] = connection.query(`SELECT * FROM Customers where phoneNumber=?`,[phoneNumber]);
    if(!user){
      return {
        success: false,
        message:'User not found'
      }
    }
    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
      return{
        success:false,
        message:'Invalid credential'
      }
    }
    return { success: true, user: user };
  }catch(error){
    console.log('error',error);
    throw new Error('Error logginin user: '+ error.message);
  }
}
module.exports = {
  insertUser,
  authenticateUser
};
