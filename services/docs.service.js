import { userService } from "./user.service";

const baseUrl = "http://localhost:4000/docs";

export const docsService = {
  create,
  list,
  findById,
  update
};

async function create(params) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userService.user.token,
    },
    body: JSON.stringify(params),
  };
  const res = await fetch(`${baseUrl}/create`, requestOptions);
  if (!res) {
    const message = `An error has occured:`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}

async function update(params) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: userService.user.token,
    },
    body: JSON.stringify(params),
  };
  const res = await fetch(`${baseUrl}/update`, requestOptions);
  if (!res) {
    const message = `An error has occured:`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}

async function list({ userId }) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userService.user.token,
    },
  };
  const url = new URL(`${baseUrl}/list`);
  const params = { userId };
  url.search = new URLSearchParams(params);
  const res = await fetch(url, requestOptions);
  if (!res) {
    const message = `An error has occured:`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}

async function findById({ id }) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: userService.user.token,
    },
  };
  const url = new URL(`${baseUrl}/find`);
  const params = { id };
  url.search = new URLSearchParams(params);
  const res = await fetch(url, requestOptions);
  if (!res) {
    const message = `An error has occured:`;
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}


