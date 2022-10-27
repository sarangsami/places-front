export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  if (user.user && user.user.token) {
    return { "authorization": `Bearer ${user.user.token}` };
  } else {
    return {};
  }
}
