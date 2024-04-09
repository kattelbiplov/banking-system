// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const User = require('../migrations/20240407051620-create-user');
// const db = require('../config/db');
// const { insertUser} = require('./CustomerClient');
// const sequelize = require('sequelize')

// const packageDefinition = protoLoader.loadSync(path.join(__dirname, "../protos/customer.proto"), { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
// const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

// async function registerUser(call, callback) {
//   try{
//       const { firstName, lastName, email, phoneNumber, address, password } = call.request;
//       insertUser(firstName, lastName, email, phoneNumber, address, password );
//    callback(null, { message: "Customer created!!" });
//   }catch(error){
//     console.log(error);
//   }
// }

// async function loginUser(call, callback) {
//   try{
//     console.log(call.request);
//   const { phoneNumber, password } = call.request;
//   // authenticateUser(phoneNumber, password);
//   callback(null, {message:"Customer loggedin!!"});
//   }catch(error){
//     console.log(error);
//   }
// }
// function main() {
//   const server = new grpc.Server();
//   server.addService(userProto.service, { RegisterUser: registerUser, LoginUser: loginUser });
//   server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (error, port) => {
//     if (error) {
//       console.error('Failed to start gRPC server.', error);
//       return;
//     }
//     console.log(`gRPC server is running on port ${port}`);
//     db.sync().then(() => {
//       console.log('Database synchronized.');
//       server.start();
//     });
//   });
// }

// main();
