import { gatewayHelper } from "../utility";
import authHeader from "./authHeader";

async function getBooks() {
  const body = {};
  const response = await gatewayHelper.http("GET", "dokumen", body);
  return response;
}

async function addBooks(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "dokumen", body, data);
  return response;
}

async function editBooks(id, data) {
  const body = {};
  const response = await gatewayHelper.http("PUT", `dokumen/${id}`, body, data);
  return response;
}

async function getBooksById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `dokumen/${id}`, body);
  return response;
}

export const BookService = {
  getBooks,
  addBooks,
  editBooks,
  getBooksById,
};
