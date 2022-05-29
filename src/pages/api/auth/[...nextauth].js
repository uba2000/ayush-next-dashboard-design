import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import axios from 'axios';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'SCAI-Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'johndoe@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.a7jcn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        )
        //Get all the users
        const users = await client.db().collection('users');
        //Find user with the email  
        const user = await users.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!user) {
          client.close();
          throw new Error('No user found with the email');
        }
        //Check hased password with DB password
        const checkPassword = await compare(credentials.password, user.password);
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error('Password doesnt match');
        }

        const token = await sign({
          slot: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '24h' })


        client.close();
        return { email: user.email, fullName: user.full_name, access_token: token };


        // const grantType = `
        //   grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=
        // `
        // const { data, status } = await axios.post("https://scai-rhasi6a2qa-uc.a.run.app/token", grantType)

        // if (status != 200) {
        //   throw new Error('Login Failed');
        // }

        // if (status == 200 && data) {
        //   return data;
        // }

        // return null;
      },
    }),
    // ...
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
          fullName: user.fullName,
          // refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {

      session.user.accessToken = token.accessToken;
      session.user.fullName = token.fullName;
      // session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});