import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { PROTO_PATH, SERVER_URI } from '../constants.js'

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const Proto = grpc.loadPackageDefinition(packageDefinition);

function add(call, callback) {
    const result = call.request.num1 + call.request.num2;
    callback(null, { result });
}

function substract(call, callback) {
    const result = call.request.num1 - call.request.num2;
    callback(null, { result });
}

function multiply(call, callback) {
    const result = call.request.num1 * call.request.num2;
    callback(null, { result });
}

function divide(call, callback) {
    if (call.request.num2 === 0) {
        return callback(
            {
                code: grpc.status.INVALID_ARGUMENT,
                message: 'No se puede dividir entre cero',
            }
        );
    }

    const result = call.request.num1 / call.request.num2;
    callback(null, { result });
}

const server = new grpc.Server();
server.addService(Proto.Calculator.service, {
    Add: add,
    Subtract: substract,
    Multiply: multiply,
    Divide: divide,
});

// Iniciar el servidor en localhost:50051
server.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), () => {
    console.log('Servidor de calculadora lista en localhost:50051');
});