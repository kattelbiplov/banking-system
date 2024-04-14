const connectDB= require('../../Customers/config/db');
const bcrypt = require('bcryptjs');

// async function insertBulkCustomer(filePath){
//     try{
//         const csvData=[];
//         FileSystem.createReadStream(filePath)
//         .pipe(parse({delimeter:'.'}))
//         .on('data', (row) => {
//             const [id, firstName, lastName, email, phoneNumber, address] = row;
//             csvData.push({ id, firstName, lastName, email, phoneNumber, address });
//           })
//           .on('end', async () => {
//             await DestinationTable.bulkCreate(csvData);
//             console.log('CSV data uploaded to the database successfully.');
//             process.exit(0);
//           });
//     }catch(error){
//         throw new error;
//     }
// }

async function checkCustomers(phoneNumber) {
  try {
    console.log("Check data: ", phoneNumber);
    const sql = `SELECT firstName, lastName, address, email FROM Customers WHERE phoneNumber = ?`;
    const values = [phoneNumber];
    console.log("value is: ", values)
    const connection = await connectDB();
    const [user] = await connection.query(sql, values);
    if (user.length === 0) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user: user[0] };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Error logging in user: ' + error.message);
  }
}

async function editCustomers(phoneNumber, firstName, lastName, email, address){
  try{
    console.log("data checking for edit:",phoneNumber, firstName, lastName, email, address)
    const sql =` UPDATE Customers SET firstName = ?, lastName = ?, email = ?, address = ? WHERE phoneNumber = ?`;
    const connection = await connectDB();
    const [user] = await  connection.query(sql,[firstName, lastName, email, address]);
    if(user.length===0){
      return {success:false, message:'User not found'};
    }
    console.log('Edited user:',user);
    return {success:true, user:user[0]};
  }catch(error){
    console.log('Error editing user:',error);
    throw new Error('Error editing user'+error.message);
  }
}


module.exports={checkCustomers, editCustomers}