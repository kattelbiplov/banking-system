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
        console.error("Error sending gRPC request:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

module.exports = { create };

