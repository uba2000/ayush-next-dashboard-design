import { hash } from 'bcryptjs';

import { checkAuth } from '../../../utils/checkAuth';
import { connect } from "../../../utils/connect";

export default async function (req, res) {
  if (req.method === 'POST') {
    try {
      let user = checkAuth(req.headers);

      const { fullName, password, gender, dob, address } = req.body

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

      const client = await connect;

      const db = await client.db().collection('users');

      await db.updateOne(
        { email: user.email },
        {
          $set: updateObject
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