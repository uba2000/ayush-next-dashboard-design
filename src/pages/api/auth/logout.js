import { serialize } from 'cookie'

export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  if (jwt) {
    const serialised = serialize(process.env.COOKIE_NAME, null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: '/'
    })

    res.setHeader("Set-Cookie", serialised)

    res.status(200).json({ message: "Successful", success: true })
  } else {
    // not logged in...
  }
}