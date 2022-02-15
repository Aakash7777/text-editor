import Router from "next/router";

const baseUrl = "http://localhost:4000/users";

export const userService = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  login,
  logout,
};

async function login(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };
  const res = await fetch(`${baseUrl}/login`, requestOptions);
  if (!res.ok) {
    const message = `An error has occured: ${res.status} - ${res.statusText}`;
    throw new Error(message);
  }
  const data = await res.json();
  userService.user = data.data;
  localStorage.setItem("user", JSON.stringify(data.data));
  return data;
}

function logout() {
  localStorage.removeItem("user");
  userService.user = null;
  Router.push("/Login");
}
