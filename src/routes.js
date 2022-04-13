const { addBookHandler } = require('./handler');

const routes = [
  // add
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

module.exports = routes;
