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
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // if pageCount === readPgae = true
  const finished = pageCount === readPage;

  // init book
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
    insertedAt,
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

  // push data to array books
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

// Read
const getBookHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// Get book by id
const getBookByIdHandler = (request, h) => {
  // get id book
  const { id } = request.params;

  // get data book
  const book = books.filter((n) => n.id === id)[0];

  // if data ready
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // if data not found
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);

  return response;
};

const updateBookByIdHandler = (request, h) => {
  // get id book
  const { id } = request.params;

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

  // update timestamp date
  const updatedAt = new Date().toISOString();

  // if pageCount === readPgae = true
  const finished = pageCount === readPage;

  // validasi
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // get data by id
  const index = books.findIndex((value) => value.id === id); //  0 = true, -1 = false

  if (index !== -1) {
    // replace old data with new data from request body
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    // response success
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // response error
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getBookHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
};
