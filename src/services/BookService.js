import { gatewayHelper } from "../utility";

async function getBooks() {
  const body = {};
  const response = await gatewayHelper.http(
    "GET",
    { "Content-Type": "application/json" },
    "buku",
    body
  );
  return response;
}

async function addBooks(data) {
  const body = {};
  const response = await gatewayHelper.http(
    "POST",
    { "Content-Type": "application/json" },
    "buku",
    body,
    data
  );
  return response;
}

export const BookService = {
  getBooks,
  addBooks,
};
