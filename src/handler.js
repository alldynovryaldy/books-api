const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // request body
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // unique id
  const id = nanoid(16);

  // timestamp
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const finished = pageCount === readPage;

  // menggabungkan objek data dalam 1 variable
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    createdAt,
    updatedAt,
  };

  // validasi
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // memasukkan data ke dalam array books
  books.push(newBooks);

  // check data
  const isSuccess = books.filter((value) => value.id === id).length > 0;

  // response success
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = {
  addBookHandler,
};
