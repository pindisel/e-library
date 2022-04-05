export default function authHeader() {
  const token = sessionStorage.getItem("token");

  if (token !== null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
