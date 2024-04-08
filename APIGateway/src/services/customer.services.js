const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const customerDefinition = protoLoader.loadSync(
    path.join(__dirname, "../../../protos/customer.proto")
);
const customerProto = grpc.loadPackageDefinition(customerDefinition);

const customerStub = new customerProto.cbs.customer.UserService(
    "0.0.0.0:50052",
    grpc.credentials.createInsecure()
);

const create = async (payload) => {
    console.log("Sending payload:", payload);
    try {
        const response = await new Promise((resolve, reject) => {
            customerStub.RegisterUser(payload, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
        console.log("Received response:", response);
        return response;
    } catch (error) {
        console.error("Error sending gRPC request for registartion:", error);
        throw error; 
    }
};

const login = async (payload) => {
    console.log("Sending payload for login:", payload);
    try {
        const response = await new Promise((resolve, reject) => {
            customerStub.LoginUser(payload, (err, res) => {
                if (err) reject(err);
                else {
                    console.log("Received response:", res);
                    resolve(res);
                }
            });
        });
        return response;
    } catch (error) {
        console.error("Error sending gRPC request for login:", error);
        throw error;
    }
};

module.exports = { create, login };


