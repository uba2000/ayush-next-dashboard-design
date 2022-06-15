import Crypto from 'crypto-js';

export function encrypt(data) {
  return Crypto.AES.encrypt(data, process.env.ENC_SECRET).toString();
}

export function decrypt(data) {
  console.log(process.env.ENC_SECRET, data);
  return Crypto.AES.decrypt(data, process.env.ENC_SECRET).toString(
    Crypto.enc.Utf8
  );
}
