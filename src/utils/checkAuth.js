import { verify } from 'jsonwebtoken'


export const checkAuth = (headers) => {
  const authHeader = headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        return verify(token, process.env.JWT_SECRET)
      } catch (error) {
        throw new Error('Invalid/Expired Token')
      }
    }
    throw new Error('Authentication Token must be \'Bearer <token>\'')
  }
  throw new Error('Authorization header must be provided')
}

export const verifyRefreshToken = (refreshToken) => {
  if (refreshToken) {
    try {
      return verify(refreshToken, process.env.REFRESH_JWT_SECRET)
    } catch (error) {
      throw new Error('Invalid/Expired Token')
    }
  }
  throw new Error('Refresh token must be provided')
}