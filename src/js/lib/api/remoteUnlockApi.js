import * as doorModel from '../model/door';

import * as auth from '../auth';

const URL = 'http://127.0.0.1:8080'
const TOKEN_HEADER_KEY = 'X-REMOTE-UNLOCK-TOKEN'

const PING_COMMAND_ID = 1;
const UNLOCK_COMMAND_ID = 2;

export async function login(password: string)  {
  const token = await auth.generateToken(password);

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

// TODO
// export async function getDoors() : Promise<doorModel.DoorResponse> {
export async function getDoors() {
  const token = await auth.generateToken(auth.getKey());

  return fetch(`${URL}/doors`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      [TOKEN_HEADER_KEY]: token,
    },
  });
};

export async function unlockDoor(doorId: string) {
  const token = await auth.generateToken(auth.getKey());
  return fetch(`${URL}/command`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      [TOKEN_HEADER_KEY]: token,
    },
    body: JSON.stringify({
      'command': {
        'type': UNLOCK_COMMAND_ID,
        'arguments': {
          'door': Number(doorId),
        },
      },
    }),
  });
};

