
import { forEach } from "lodash";

import { checkAuth } from "../../../utils/checkAuth";
import dbConnect from "../../../utils/connect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let userAuth = checkAuth(req.headers);

        const user = await User.findOne({ email: userAuth.email })

        let newArray = []

        if (user) {
          if (user.members.length > 0) {
            forEach(user.members, async (value, index) => {
              if (value.accepted) {
                let memberUser = await User.findOne({ _id: value._id })
                newArray.push({
                  fullName: memberUser.full_name,
                  email: memberUser.email,
                  ...value
                })
              }
              if (index == (user.members.length - 1)) {
                res.status(200).json({ success: true, data: newArray })
              }
            })
          } else {
            res.status(200).json({ success: true, data: [] })
          }
        } else {
          res.status(200).json({ success: true, data: [] })
        }
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