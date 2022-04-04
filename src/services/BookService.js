import { gatewayHelper } from "../utility";

async function getBooks() {
  const body = {};
  const response = await gatewayHelper.http("GET", "buku", body);
  return response;
}

async function addBooks(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "buku", body, data);
  return response;
}

async function editBooks(id, data) {
  const body = {};
  const response = await gatewayHelper.http("PUT", `buku/${id}`, body, data);
  return response;
}

async function getBooksById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `buku/${id}`, body);
  return response;
}

export const BookService = {
  getBooks,
  addBooks,
  editBooks,
  getBooksById,
};
