import { forEach } from 'lodash';

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

        const user = await User.findOne({ email: userAuth.email });

        let newArray = [];
        let pendingArray = [];

        if (user) {
          if (user.members.length > 0) {
            forEach(user.members, async (value, index) => {
              if (value.accepted) {
                newArray.push({
                  ...value._doc,
                });
              } else {
                pendingArray.push({
                  ...value._doc,
                });
              }
              if (index == user.members.length - 1) {
                return res.status(200).json({
                  success: true,
                  data: { accepted: newArray, pending: pendingArray },
                });
              }
            });
          } else {
            return res
              .status(200)
              .json({ success: true, data: { accepted: [], pending: [] } });
          }
        } else {
          return res
            .status(200)
            .json({ success: true, data: { accepted: [], pending: [] } });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
