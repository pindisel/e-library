import axios from "axios";

const BASE_URL = "https://elibrary-back.herokuapp.com";

async function http(method, endpoint, body = null, data) {
  const headers = { "Content-Type": "application/json" };
  let response = null;

  if (method) {
    response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method: method.toUpperCase(),
      headers,
      params: body,
      data: data,
    });
  }

  return response;
}

export const gatewayHelper = {
  http,
};
