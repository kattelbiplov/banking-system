const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { rejects } = require("assert");

const customerDefinition = protoLoader.loadSync(
    path.join(__dirname, "../../../protos/bulkData.proto")
);
const customerProto = grpc.loadPackageDefinition(customerDefinition);

const customerStub = new customerProto.cbs.admin.DataService(
    "0.0.0.0:50055",
    grpc.credentials.createInsecure()
);

// const createBulkCustomer = async (payload) => {
//     console.log("Sending payload:", payload);
//     try {
//         const response = await new Promise((resolve, reject) => {
//             customerStub.UploadBulkData(payload, (err, res) => {
//                 if (err) reject(err);
//                 else resolve(res);
//             });
//         });
//         console.log("Received response:", response);
//         return response;
//     } catch (error) {
//         console.error("Error sending gRPC request for registartion:", error);
//         throw error;
//     }
// };


const checkCustomers = async(payload)=>{
    console.log('sending payload', payload)
    try{
        const response = await new Promise((resolve, reject) => {
            customerStub.CheckCustomer(payload, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
        console.log("Received response:", response);
        return response;
    }catch(error){
        console.log('error on checking cutomer from admin',error);
    }
}

const editCustomers = async(payload)=>{
    try{
        const response = await new Promise((resolve,reject)=>{
            customerStub.EditCustomer(payload,(err,res)=>{
                if(err) reject (err);
                else resolve(res);
            })
        });
        console.log('Received response: ',response)
        return response;
    }catch(error){
        console.log('error on editing customer from admin',error);
    }
}

module.exports = { checkCustomers, editCustomers };


