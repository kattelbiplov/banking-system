const grpc = require('@grpc/grpc-js');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../protos/bulkData.proto');
const protoLoader = require('@grpc/proto-loader');
const sequelize = require('sequelize');
const { error } = require('console');
const { checkCustomers } = require('./services/AdminClient');
const { editCustomers } = require('../APIGateway/src/services/admin.services');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition);

// async function registerBulkUser(call, callback) {
//     try {
//       const { csvFilePath } = call.request; 
//       await bulkUploadCSV(csvFilePath);
//       callback(null, { message: 'CSV data uploaded successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       callback(error);
//     }
// }

async function checkUser(call, callback) {
  try {
    const { phoneNumber } = call.request;
    const result = await checkCustomers(phoneNumber);
    if (result.success) {
      console.log('Customer found: ', result);
      callback(null, result);
    } else {
      console.log('Customer not found');
      callback(null, { message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error on checking customer:', error);
    callback(error);
  }
}

async function editUser(call, callback) {
  try {
    const { phoneNumber, firstName, lastName, email, address } = call.request;
    console.log('Editing user:', phoneNumber, firstName, lastName, email, address);
    
    const result = await editCustomers({ phoneNumber, firstName, lastName, email, address });
    console.log('Edit result:', result);

    if (result.success) {
      console.log('Customer edited successfully:', result);
      callback(null, result);
    } else {
      console.log('Customer not edited:', result.message);
      callback(null, { message: 'Customer not edited' });
    }
  } catch (error) {
    console.error('Error editing customer:', error);
    callback(error);
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(userProto.cbs.admin.DataService.service, { CheckCustomer: checkUser, EditCustomer: editUser });
  server.bindAsync('0.0.0.0:50055', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Failed to start gRPC server.', error);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
  });
}

main();
