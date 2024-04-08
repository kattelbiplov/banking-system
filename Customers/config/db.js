const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    return await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "bankingsystem",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB  