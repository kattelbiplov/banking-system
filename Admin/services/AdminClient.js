const connectDB= require('../../Customers/config/db');
const bcrypt = require('bcryptjs');

async function insertBulkCustomer(filePath){
    try{
        const csvData=[];
        FileSystem.createReadStream(filePath)
        .pipe(parse({delimeter:'.'}))
        .on('data', (row) => {
            const [id, firstName, lastName, email, phoneNumber, address] = row;
            csvData.push({ id, firstName, lastName, email, phoneNumber, address });
          })
          .on('end', async () => {
            await DestinationTable.bulkCreate(csvData);
            console.log('CSV data uploaded to the database successfully.');
            process.exit(0);
          });
    }catch(error){
        throw new error;
    }
}
module.exports={insertBulkCustomer}