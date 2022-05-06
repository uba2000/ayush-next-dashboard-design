import { verify } from "jsonwebtoken"

export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  if (!jwt) {
    return res.json({ message: "Invalid token", user: null })
  }

  const decoded = verify(jwt, process.env.SECRET)
  console.log(decoded);
  return res.json({ user: true })
  // unsign token then get user details...
  // return 
}