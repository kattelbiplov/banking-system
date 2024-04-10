const grpc=require('@grpc/grpc-js');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../protos/customer.proto');
const sequelize = require('sequelize');
const { error } = require('console');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const userProto = grpc.loadPackageDefinition(packageDefinition);