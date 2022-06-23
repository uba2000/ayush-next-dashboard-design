import { hash } from 'bcryptjs';

import dbConnect from '../../../utils/connect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      //Getting email and password from body
      const { email } = req.body;

      //Validate
      if (!email || !email.includes('@')) {
        res.status(422).json({ message: 'Invalid Data' });
        return;
      }

      return res.status(200).json({ success: true });
      break;

    default:
      return res.status(400).json({ success: false });
      break;
  }
}
