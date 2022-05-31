

import { signAccessToken, signRefreshToken } from "../../../utils/jwtHelper";
import { verifyRefreshToken } from "../../../utils/checkAuth";

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
        }

        let tokenPayload = verifyRefreshToken(refreshToken);

        const accessToken = await signAccessToken(tokenPayload)
        const newRefreshToken = await signRefreshToken(tokenPayload)

        res.status(200).json({ success: true, accessToken, refreshToken: newRefreshToken })
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      }
      break;

    default:
      break;
  }

}