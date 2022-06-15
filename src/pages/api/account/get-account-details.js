import { checkAuth } from '../../../utils/checkAuth';
import dbConnect from '../../../utils/connect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const user = await User.findById(userAuth._id);

        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}
