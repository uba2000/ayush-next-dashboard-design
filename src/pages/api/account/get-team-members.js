
import { forEach } from "lodash";
import { checkAuth } from "../../../utils/checkAuth";
import { connect } from "../../../utils/connect";

export default async function (req, res) {
  if (req.method === 'GET') {
    try {
      let userAuth = checkAuth(req.headers);

      const client = await connect;

      const users = await client.db().collection('users');

      const user = await users.findOne({ email: userAuth.email })

      let newArray = []

      if (user.members.length > 0) {
        forEach(user.members, async (value, index) => {
          if (value.accepted) {
            let memberUser = await users.findOne({ _id: value._id })
            newArray.push({
              fullName: memberUser.full_name,
              email: memberUser.email,
              ...value
            })
          }
          if (index == (user.members.length - 1)) {
            client.close();
            return res.send({ success: true, message: "Success", data: newArray })
          }
        })
      } else {
        return res.send({ success: true, message: "Success", data: newArray })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  }
}