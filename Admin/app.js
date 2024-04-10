const grpc= require('@grpc/grpc-js');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../protos/customer.proto');
const protoLoader = require('@grpc/proto-loader');
const sequelize = require('sequelize');
const { error } = require('console');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition);

async function registerBulkUser(call, callback) {
    try {
      const { csvFilePath } = call.request; 
      await bulkUploadCSV(csvFilePath);
      callback(null, { message: 'CSV data uploaded successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      callback(error);
    }
}

  function main() {
    const server = new grpc.Server();
    server.addService(userProto.cbs.customer.UserService.service, { RegisterUser: registerBulkUser });
    server.bindAsync('0.0.0.0:50055', grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error('Failed to start gRPC server.', error);
        return;
      }
      console.log(`gRPC server is running on port ${port}`);
    });
  }
  
  main();
  