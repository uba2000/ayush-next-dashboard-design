
import { connect } from "../../../utils/connect";
import { checkAuth } from '../../../utils/checkAuth';

export default async function (req, res) {
  if (req.method === 'POST') {
    try {
      let userAuth = checkAuth(req.headers);
      const { email } = req.body

      const client = await connect;

      const db = await client.db().collection('users')

      const invitedUser = await db.findOne({ email: email })

      // if (!invitedUser) {
      //   res.status(422).json({ message: 'User does not exists' });
      //   client.close();
      //   return;
      // }

      // TODO: send email to user to accept

      // TODO: check if email:user is a member already

      // TODO: add email to members array, accepted: false
      await db.updateOne(
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

      client.close();
      return res.send({ success: true, message: "Success" })
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  }
}