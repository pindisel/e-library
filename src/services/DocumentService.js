import { gatewayHelper } from "../utility";

async function getDocument() {
  const body = {};
  const response = await gatewayHelper.http("GET", "dokumen", body);
  return response;
}

async function getSupervisor() {
  const body = {};
  const response = await gatewayHelper.http("GET", "pengguna/supervisor", body);
  return response;
}

async function addDocument(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "dokumen", body, data);
  return response;
}

async function deleteDocument(id) {
  const body = {};
  const response = await gatewayHelper.http("DELETE", `dokumen/${id}`, body);
  return response;
}

async function getDocumentById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `dokumen/${id}`, body);
  return response;
}

async function getAllBorrowedDocument() {
  const body = {};
  const response = await gatewayHelper.http("GET", `peminjaman`, body);
  return response;
}

async function borrowDocument(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "peminjaman", body, data);
  return response;
}

async function getBorrowedDocument(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `peminjaman/${id}`, body);
  return response;
}

async function getBorrowedSuper(id) {
  const body = {};
  const response = await gatewayHelper.http(
    "GET",
    `peminjaman/konfirmasi/${id}`,
    body
  );
  return response;
}

async function viewDocument(id) {
  const body = {};
  const response = await gatewayHelper.http(
    "GET",
    `peminjaman/detail/${id}`,
    body
  );
  return response;
}

async function editStatus(id, data) {
  const body = {};
  const response = await gatewayHelper.http(
    "PUT",
    `peminjaman/${id}`,
    body,
    data
  );
  return response;
}

async function editDocument(id, data) {
  const body = {};
  const response = await gatewayHelper.http("PUT", `dokumen/${id}`, body, data);
  return response;
}

export const DocumentService = {
  getDocument,
  addDocument,
  deleteDocument,
  getDocumentById,
  borrowDocument,
  getAllBorrowedDocument,
  getBorrowedDocument,
  getBorrowedSuper,
  editStatus,
  viewDocument,
  getSupervisor,
  editDocument,
};
