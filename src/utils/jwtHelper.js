import { sign } from 'jsonwebtoken';

export async function signAccessToken(payload) {
  return await sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export async function signRefreshToken(payload) {
  return await sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: '1y' })
}