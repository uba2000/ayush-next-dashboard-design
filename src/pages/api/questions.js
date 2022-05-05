import axios from "axios"
import { verify } from "jsonwebtoken"

export default async function (req, res) {
  const { keyword } = req.body

  // put in a seperate utils file - START
  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  const secret = process.env.SECRET

  const decoded = verify(jwt, secret)

  try {

    const options = {
      headers: { 'Authorization': `Bearer ${decoded.access_token}` }
    };

    const encodedKeyword = encodeURIComponent(keyword)

    const url = `https://scai-rhasi6a2qa-uc.a.run.app/questions?keyword=${encodedKeyword}`
    // console.log(url);

    const { data } = await axios.get(url, options)

    res.status(200).json({ quesions: data.questions, message: "Successful", success: true })

  } catch (error) {
    console.log(error);
    res.json({ message: "An error occured!", success: false })
  }
}