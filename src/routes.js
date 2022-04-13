const {
  addBookHandler,
  getBookHandler,
  getBookByIdHandler,
} = require('./handler');

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

  // get book by id
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
];

module.exports = routes;
