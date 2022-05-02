import swaggerAutogen from 'swagger-autogen'

const sgen = swaggerAutogen();

const outputFile = './backend/swagger.json';
const endpointsFiles = ['./backend/server.js'];

sgen(outputFile, endpointsFiles);