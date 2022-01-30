import axios from "axios";

const BASE_URL = "https://elibrary-back.herokuapp.com";

async function http(method, headers, endpoint, body = null, data) {
  // const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  let response = null;

  if (method) {
    response = await axios({
      headers: headers,
      url: `${BASE_URL}/${endpoint}`,
      method: method.toUpperCase(),
      params: body,
      data: data,
    });
  }

  return response;
}

export const gatewayHelper = {
  http,
};
