import { verify } from "jsonwebtoken"

export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  if (!jwt) {
    return res.json({ message: "Invalid token" })
  }

  const decoded = verify(jwt, process.env.SECRET)
  console.log(decoded);
  return res.json({ data: decoded })
  // unsign token then get user details...
  // return 
}