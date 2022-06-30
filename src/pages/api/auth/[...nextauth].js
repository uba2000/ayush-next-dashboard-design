import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import dbConnect from '../../../utils/connect';
import User from '../../../models/User';
import { signAccessToken, signRefreshToken } from '../../../utils/jwtHelper';

function isValidHttpUrl(url) {
  try {
    return /^https?:/.test(url).protocol;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.query.callbackUrl && !isValidHttpUrl(req.query.callbackUrl)) {
    return res.status(500).send('');
  }

  return await NextAuth(req, res, {
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
          await dbConnect();
          try {
            //Find user with the email
            const user = await User.findOne({
              email: credentials.email,
            });
            //Not found - send error res
            if (!user) {
              client.close();
              throw new Error('No user found with the email');
            }
            //Check hased password with DB password
            const checkPassword = await compare(
              credentials.password,
              user.password
            );
            //Incorrect password - send response
            if (!checkPassword) {
              client.close();
              throw new Error('Password doesnt match');
            }

            const token = await signAccessToken({
              _id: user._id,
              email: user.email,
            });

            const refreshToken = await signRefreshToken({
              _id: user._id,
              email: user.email,
            });

            return {
              email: user.email,
              gender: user.gender,
              address: user.address,
              dob: user.dob,
              fullName: user.full_name,
              access_token: token,
              refresh_token: refreshToken,
              current_plan: user.current_plan,
            };
          } catch (error) {
            console.log(error);
            return null;
          }
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
        // console.log('Help');
        // TODO: refresh token here...
        // console.log({ token, user, account });
        if (account && user) {
          let { access_token, refresh_token, ...fUser } = user;
          return {
            ...token,
            ...fUser,
            accessToken: user.access_token,
            refreshToken: user.refresh_token,
          };
        }

        return token;
      },

      async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.currentPlan = token.current_plan;
        session.user.fullName = token.fullName;
        session.user.dob = token.dob;
        session.user.address = token.address;
        session.user.gender = token.gender;
        session.user.refreshToken = token.refreshToken;
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
}
