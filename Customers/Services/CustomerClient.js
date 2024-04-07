const db = require('../config/db');

async function insertUser(firstName, lastName, email, phoneNumber, address, password) {
  const sqlQuery = `INSERT INTO Customers (firstName, lastName, email, phoneNumber, address, password)
                    VALUES (?,?,?,?,?,?)`
  try {
    const [result] = await db.query(sqlQuery, { replacements: [firstName, lastName, email, phoneNumber, address, password] });
    return result;
  } catch (error) {
    throw new Error('Error inserting user:', error);
  }
}

module.exports = {
  insertUser
};
