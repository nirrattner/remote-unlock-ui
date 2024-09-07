import * as auth from '../lib/auth';

const URL = 'http://127.0.0.1:8080'
const TOKEN_HEADER_KEY = 'X-REMOTE-UNLOCK-TOKEN'

export async function login(password: string)  {
  const token = await auth.generateToken(password);

  console.log(password);

  return fetch(`${URL}/login`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      'token': token,
    }),
  });
};


export async function ping(password: string)  {
  const key = auth.getKey();
  const token = await auth.generateToken(key);
  return fetch(`${URL}/login`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      TOKEN_HEADER_KEY: token,
    },
  });
};

