

import { signAccessToken, signRefreshToken } from "../../../utils/jwtHelper";
import { verifyRefreshToken } from "../../../utils/checkAuth";

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(422).json({ message: 'Invalid Data' });
        return;
      }

      let tokenPayload = verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(tokenPayload)
      const newRefreshToken = await signRefreshToken(tokenPayload)

      return res.send({ success: true, message: "Success", accessToken, refreshToken: newRefreshToken })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
  }
}