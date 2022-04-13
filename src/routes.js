const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
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
    handler: getAllBookHandler,
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

  // delete
  {
    method: 'DElETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
