const KEY_STORAGE_KEY = 'remote-unlock-key';
const TOKEN_DELIMITER = '.';

export async function generateToken(key: string) : Promise<string> {
  const timestamp = Math.trunc(Date.now() / 1000);
  const tokenBody = JSON.stringify({'timestamp': timestamp});

  const encoder = new TextEncoder();
  const encodedTokenBody = encoder.encode(tokenBody);
  const encodedKey = encoder.encode(key);

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encodedTokenBody,
  );
  const base64Signature = btoa(String.fromCharCode(...Array.from(new Uint8Array(signature))));
  return (btoa(tokenBody) + TOKEN_DELIMITER + base64Signature)
      .replace(/_/g, '/')
      .replace(/-/g, '+');
}

export function setKey(key: string) {
  localStorage.setItem(KEY_STORAGE_KEY, key);
}

export function getKey() : string | null {
  return localStorage.getItem(KEY_STORAGE_KEY);
}

export function deleteKey() {
  return localStorage.removeItem(KEY_STORAGE_KEY);
}

