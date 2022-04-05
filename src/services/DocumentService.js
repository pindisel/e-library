import { gatewayHelper } from "../utility";
import authHeader from "./authHeader";

async function getDocument() {
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

async function getDocumentById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", `dokumen/${id}`, body);
  return response;
}

export const DocumentService = {
  getDocument,
  addBooks,
  editBooks,
  getDocumentById,
};
