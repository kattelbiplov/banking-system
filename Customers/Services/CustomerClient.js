const connectDB = require('../config/db');


async function insertUser(firstName, lastName, email, phoneNumber, address, password) {
  try {
    console.log("nhhbhnbj",firstName, lastName, email, phoneNumber, address, password)
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

module.exports = {
  insertUser
};
