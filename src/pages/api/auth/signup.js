import { hash } from 'bcryptjs';

import { connect } from '../../../utils/connect'

export default async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
    //Getting email and password from body
    const { email, password, fullName } = req.body;

    //Validate
    if (!email || !email.includes('@') || !password || !fullName) {
      res.status(422).json({ message: 'Invalid Data' });
      return;
    }

    const client = await connect

    const db = client.db();

    //Check existing
    const checkEmailExisting = await db
      .collection('users')
      .findOne({ email: email });

    //Send error response if duplicate user is found
    if (checkEmailExisting) {
      res.status(422).json({ message: 'User already exists' });
      client.close();
      return;
    }

    //Hash password
    const status = await db.collection('users').insertOne({
      email,
      full_name: fullName,
      role: 'user',
      account_role: 'owner',
      members: [],
      password: await hash(password, 12),
    });

    //Send success response
    res.status(201).json({ message: 'User created', ...status });

    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: 'Route not valid' });
  }
}