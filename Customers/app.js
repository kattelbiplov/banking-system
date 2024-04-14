const grpc = require('@grpc/grpc-js');
const path = require('path')
const protoLoader = require('@grpc/proto-loader');
const User = require('./migrations/20240407051620-create-user')
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const { insertUser, authenticateUser, userProfile } = require('./Services/CustomerClient');
const { request } = require('express');
const PROTO_PATH = path.join(__dirname, '../protos/customer.proto');
const sequelize = require('sequelize');
const { error } = require('console');
//const PROTO_PATH =   '../../protos/customer.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition);

async function registerUser(call, callback) {
  try {
    const { firstName, lastName, email, phoneNumber, address, password } = call.request;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(firstName, lastName, email, phoneNumber, address, hashedPassword);

    if (result.success) {
      callback(null, { message: result.message });
    } else {
      callback(null, { message: result.message })
    }
  } catch (error) {
    console.error('Error registering user:', error);
    callback(error);
  }
}


async function loginUser(call, callback) {
  try {
    const { phoneNumber, password } = call.request;
    const result = await authenticateUser(phoneNumber, password)
    if (result.success) {
      callback(null, { message: result.message });
    } else {
      callback(null, { message: result.message });
    }
  }

  catch (error) {
    console.log('Error logging in user:', error);
    callback(error)
  }
}

// async function userProfile(userId) {
//   try {
//     const userProfileData = await User.findByPk(userId); 
//     if (!userProfileData) {
//       return {
//         success: false,
//         message: 'User profile not found',
//       };
//     }
//     const userProfileResponse = {
//       success: true,
//       message: 'User profile retrieved successfully',
//       userProfile: {
//         userId: userProfileData.userId,
//         firstName: userProfileData.firstName,
//         lastName: userProfileData.lastName,
//         email: userProfileData.email,
//         phoneNumber: userProfileData.phoneNumber,
//         address: userProfileData.address,
//       },
//     };
//     return userProfileResponse;
//   } catch (error) {
//     console.error('Error retrieving user profile:', error);
//     throw new Error('Error retrieving user profile: ' + error.message);
//   }
// }


function main() {
  const server = new grpc.Server();
  server.addService(userProto.cbs.customer.UserService.service, { RegisterUser: registerUser, LoginUser: loginUser });
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error('Failed to start gRPC server.', error);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
  });
}

main();
