import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { connect } from '../../../utils/connect';

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
        const client = await connect
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
          _id: user._id,
          email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '24h' })

        client.close();
        return {
          email: user.email,
          gender: user.gender,
          address: user.address,
          dob: user.dob,
          fullName: user.full_name,
          access_token: token
        };
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
        let { access_token, ...fUser } = user
        return {
          ...token,
          ...fUser,
          accessToken: user.access_token,
          // refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {

      session.user.accessToken = token.accessToken;
      session.user.fullName = token.fullName;
      session.user.dob = token.dob;
      session.user.address = token.address;
      session.user.gender = token.gender;
      // TODO: build refresh token
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