import { hash } from 'bcryptjs';

import { checkAuth } from '../../../utils/checkAuth';
import User from '../../../models/User';
import dbConnect from '../../../utils/connect';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);

        const { role, memberId } = req.body;

        const user = await User.findById(userAuth._id);

        const memberIndex = user.members.findIndex(
          (item) => item._id == memberId
        );

        user.members[memberIndex].role = role;

        await user.save();

        return res.status(200).json({ success: true });
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
