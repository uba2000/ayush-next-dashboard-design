import axios from 'axios'

export default async function (req, res) {
  const { slug, featureData, accessToken } = req.body

  if (accessToken) {
    try {

      const options = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      };

      const url = `https://scai-rhasi6a2qa-uc.a.run.app/facebook_primary?${featureData}`
      console.log(url);

      const { data } = await axios.get(url, options)
      console.log(data);  

      res.status(200).json({ quesions: data, message: "Successful", success: true })
    } catch (error) {
      res.json({ message: "An error occured!", success: false, error })
    }
  }
  res.json({ message: "Invalid token", success: false })
}