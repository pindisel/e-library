import { gatewayHelper } from "../utility";

async function signUp(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "", body, data);
  return response;
}

export const RegisterService = {
  signUp,
};
