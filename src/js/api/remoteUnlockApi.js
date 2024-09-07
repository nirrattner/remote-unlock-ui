const URL = 'http://127.0.0.1:8080'

export async function login(password: string)  {
  return fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
  });
};
