const {
  addBookHandler,
  getBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
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

  // update
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler,
  },
];

module.exports = routes;
