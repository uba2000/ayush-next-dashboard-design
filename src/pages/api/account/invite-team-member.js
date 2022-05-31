
import dbConnect from "../../../utils/connect";
import User from "../../../models/User";
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);
        const { email } = req.body

        const invitedUser = await User.findOne({ email: email })

        // if (!invitedUser) {
        //   res.status(422).json({ message: 'User does not exists' });
        //   client.close();
        //   return;
        // }

        // TODO: send email to user to accept

        // TODO: check if email:user is a member already

        // TODO: add email to members array, accepted: false
        await User.updateOne(
          { email: userAuth.email },
          {
            $push: {
              members: {
                _id: invitedUser._id,
                accepted: false,
                role: "admin"
              }
            }
          }
        )

        res.status(200).json({ success: true })
      } catch (error) {
        console.log(error);
        return res.status(500).send(error)
      }
      break;

    default:
      res.status(400).json({ success: false })
      break
  }

}