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

async function loginUser(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "login", body, data);
  return response;
}

export const UserService = {
  getUser,
  addUser,
  loginUser,
};
