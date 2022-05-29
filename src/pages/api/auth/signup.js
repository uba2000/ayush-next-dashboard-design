import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

// import { connect } from '../../../utils/connect'

export default async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
    //Getting email and password from body
    const { email, password, username } = req.body;

    //Validate
    if (!email || !email.includes('@') || !password || !username) {
      res.status(422).json({ message: 'Invalid Data' });
      return;
    }

    const connect = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.a7jcn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    const db = connect.db();

    //Check existing
    const checkEmailExisting = await db
      .collection('users')
      .findOne({ email: email });
    const checkUsernameExisting = await db
      .collection('users')
      .findOne({ username: username });

    //Send error response if duplicate user is found
    if (checkEmailExisting) {
      res.status(422).json({ message: 'User already exists' });
      connect.close();
      return;
    }

    if (checkUsernameExisting) {
      res.status(422).json({ message: 'User already exists' });
      connect.close();
      return;
    }

    //Hash password
    const status = await db.collection('users').insertOne({
      email,
      username,
      role: 'user',
      password: await hash(password, 12),
    });

    //Send success response
    res.status(201).json({ message: 'User created', ...status });

    //Close DB connection
    connect.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: 'Route not valid' });
  }
}