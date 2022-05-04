import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import axios from 'axios'

export default async function (req, res) {
  const { username, password } = req.body

  const secret = process.env.SECRET
  try {
    const grantType = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
    const { data } = await axios.post("https://scai-rhasi6a2qa-uc.a.run.app/token", grantType)

    const nextToken = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        ...data,
      },
      secret
    )

    const serialised = serialize(process.env.COOKIE_NAME, nextToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })

    res.setHeader("Set-Cookie", serialised)

    res.status(200).json({ message: "Successful" })
  } catch (error) {
    throw error
  }
}