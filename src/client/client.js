import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { PROTO_PATH, SERVER_URI } from '../constants.js'

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const Proto = grpc.loadPackageDefinition(packageDefinition);

const client = new Proto.Calculator(SERVER_URI, grpc.credentials.createInsecure());

const methods = {
  add: client.Add.bind(client),
  subtract: client.Subtract.bind(client),
  multiply: client.Multiply.bind(client),
  divide: client.Divide.bind(client),
}

export function operate(operation, num1, num2) {
  return new Promise((res, reject) => {
    const fn = methods[operation];
    fn({ num1, num2 }, (err, response) => !err ? res(response.result) : reject(err));
  })
}

