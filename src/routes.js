const { addBookHandler, getBookHandler } = require('./handler');

const routes = [
  // add
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // read
  {
    method: 'GET',
    path: '/books',
    handler: getBookHandler,
  },
];

module.exports = routes;
