const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKeys = require('../config/auth');
const secretKey = secretKeys.secretKey;
async function insertUser(firstName, lastName, email, phoneNumber, address, password) {
  try {
    console.log("user data: ", firstName, lastName, email, phoneNumber, address, password);
    // Check if user with phoneNumber already exists
    const connection = await connectDB();
    const [existingUser] = await connection.query(userExistsQuery, [phoneNumber]);
    console.log(existingUser);
    if (existingUser[0].count > 0) {
      console.log('User already exist');
      return {
        success: false,
        message: 'User already exist'
      }
    } else {
      const insertQuery = `INSERT INTO Customers (firstName, lastName, email, phoneNumber, address, password) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [firstName, lastName, email, phoneNumber, address, password];
      await connection.query(insertQuery, values);
      return {
        success: true,
        message: 'User Registered successfully'
      }
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    throw new Error('Error inserting user: ' + error.message);
  }
}


async function authenticateUser(phoneNumber, password) {
  try {
    console.log("Login data: ", phoneNumber, password);
    const sql = `SELECT * FROM Customers WHERE phoneNumber = ?`;
    const values = [phoneNumber];
    console.log("values are: ", values)
    const connection = await connectDB();
    const [user] = await connection.query(sql, values);

    // Check if user exists
    if (!user || user.length === 0) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    // Check if password matches
    const matchPassword = await bcrypt.compare(password, user[0].password);
    if (!matchPassword) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }
    // Generate JWT token
    const token = jwt.sign({
      userId: user[0].userId,
      email: user[0].email,
      firstName: user[0].firstName,
      lastName: user[0].lastName
    }, secretKey, { expiresIn: '1h' });

    console.log(token);
    return { success: true, token: token };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Error logging in user: ' + error.message);
  }
}

async function userProfile(userId) {
  try {
    const [rows] = await connection.execute('SELECT * FROM Customers WHERE userId = ?', [userId]);
    const connection = await connectDB();
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error on user profile :', error);
    throw new error;
  }
}


module.exports = {
  insertUser,
  authenticateUser,
  userProfile
};
