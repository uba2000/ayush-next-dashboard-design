export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  if (!jwt) {
    return res.json({ message: "Invalid token" })
  }

  // unsign token then get user details...
  // return 
}