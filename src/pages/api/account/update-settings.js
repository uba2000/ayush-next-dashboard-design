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
        let user = checkAuth(req.headers);

        const { fullName, password, gender, dob, address } = req.body;

        let updateObject = {};

        if (fullName) {
          updateObject.full_name = fullName;
        }
        if (password) {
          updateObject.password = await hash(password, 12);
        }
        if (gender) {
          updateObject.gender = gender;
        }
        if (dob) {
          updateObject.dob = dob;
        }
        if (address) {
          updateObject.address = address;
        }

        await User.updateOne(
          { email: user.email },
          {
            $set: updateObject,
          }
        );

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
