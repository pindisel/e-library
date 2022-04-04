import { gatewayHelper } from "../utility";

async function getUser() {
  const body = {};
  const response = await gatewayHelper.http("GET", "pengguna", body);
  return response;
}

async function addUser(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "pengguna", body, data);
  return response;
}

async function editUser(id, data) {
  const body = {};
  const response = await gatewayHelper.http("PUT", `buku/${id}`, body, data);
  return response;
}

export const UserService = {
  getUser,
  addUser,
  editUser,
};
