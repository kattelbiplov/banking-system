const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const User = require('../migrations/20240407051620-create-user');
const db = require('../config/db');
const { insertUser } = require('./CustomerClient');
const PROTO_PATH = __dirname + '/../protos/customer.proto';
//const PROTO_PATH =   '../../protos/customer.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

function registerUser(call, callback) {
  const {firstName, lastName, email, phoneNumber, address, password } = call.request;
  insertUser(sequelize, firstName, lastName, email, phoneNumber, address, password)
    .then(() => {
      callback(null, { message: 'User registered successfully' });
    })
    .catch(error => {
      callback(error, null);
    });
}

function loginUser(call, callback) {
    const { phoneNumber, password } = call.request;
    authenticateUser(phoneNumber, password)
      .then(user => {
        callback(null, { message: 'User authenticated successfully.', user });
      })
      .catch(error => {
        callback(error, null);
      });
}

function main() {
  const server = new grpc.Server();
  server.addService(userProto.service, { RegisterUser: registerUser, LoginUser:loginUser });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Failed to start gRPC server.', error);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
    db.sync().then(() => {
      console.log('Database synchronized.');
      server.start();
    });
  });
}

main();
