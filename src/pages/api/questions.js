import axios from "axios"
import { verify } from "jsonwebtoken"

export default async function (req, res) {
  const { keyword, accessToken } = req.body

  // put in a seperate utils file - START
  console.log(accessToken);
  if (accessToken) {
    try {

      const options = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      };

      const encodedKeyword = encodeURIComponent(keyword)

      const url = `https://scai-rhasi6a2qa-uc.a.run.app/questions?keyword=${encodedKeyword}`
      // console.log(url);

      const { data } = await axios.get(url, options)

      res.status(200).json({ quesions: data.questions, message: "Successful", success: true })

    } catch (error) {
      res.json({ message: "An error occured!", success: false })
    }
  }
  res.json({ message: "Invalid token", success: false })
}