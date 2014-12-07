module.exports.swagger = {
  docsFolder: './api/docs',
  modelsFolder: './api/models',
  url: '/docs',
  apiDocs: '/api-docs.json',
  uiDist: './node_modules/swagger-ui/dist',
  title: 'Material API documentation',
  description: 'An API to discover what is actually inside your device',
  swaggerVersion: '1.2.5',
  operations: ['GET', 'POST', 'PUT', 'DELETE'],
  apiURL: 'http://localhost:1337/api/v1',
};
