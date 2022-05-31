import { hash } from 'bcryptjs';

import dbConnect from '../../../utils/connect'
import User from '../../../models/User'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      //Getting email and password from body
      const { email, password, fullName } = req.body;

      //Validate
      if (!email || !email.includes('@') || !password || !fullName) {
        res.status(422).json({ message: 'Invalid Data' });
        return;
      }

      //Check existing
      const checkEmailExisting = await User.findOne({ email: email });

      //Send error response if duplicate user is found
      if (checkEmailExisting) {
        res.status(422).json({ message: 'User already exists' });
        client.close();
        return;
      }

      //Hash password
      const status = await User.insertOne({
        email,
        full_name: fullName,
        password: await hash(password, 12),
      });

      //Send success response
      res.status(200).json({ success: true, ...status })
      break;

    default:
      res.status(400).json({ success: false })
      break
  }

}