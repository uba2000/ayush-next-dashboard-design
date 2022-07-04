import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let userAuth = checkAuth(req.headers);
        const { email } = req.body;

        const invitedUser = await User.findOne({ email: email });

        const user = await User.findById(userAuth._id);

        // TODO: send email to user to accept

        if (user.members.find((item) => item.email === email)) {
          return res.status(422).json({
            success: false,
            error: {
              message: 'Email already invited!',
            },
          });
        }

        await User.updateOne(
          { email: userAuth.email },
          {
            $push: {
              members: {
                full_name: invitedUser ? invitedUser.full_name : '---',
                member_id: invitedUser ? invitedUser._id : '',
                email: email,
              },
            },
          }
        );

        // TODO: check if email:user is a member already

        // TODO: add email to members array, accepted: false

        res.status(200).json({ success: true });
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
