import { gatewayHelper } from "../utility";

async function getDocument() {
  const body = {};
  const response = await gatewayHelper.http("GET", "dokumen", body);
  return response;
}

async function addDocument(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "dokumen", body, data);
  return response;
}

async function editBooks(id, data) {
  const body = {};
  const response = await gatewayHelper.http("PUT", `dokumen/${id}`, body, data);
  return response;
}

async function getDocumentById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `dokumen/${id}`, body);
  return response;
}

async function borrowDocument(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "peminjaman", body, data);
  return response;
}

export const DocumentService = {
  getDocument,
  addDocument,
  editBooks,
  getDocumentById,
  borrowDocument,
};
