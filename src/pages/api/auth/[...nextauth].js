import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'SCAI-Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'username',
          placeholder: 'johndoe',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const grantType = `
          grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=
        `
        const { data, status } = await axios.post("https://scai-rhasi6a2qa-uc.a.run.app/token", grantType)

        if (status != 200) {
          throw new Error('Login Failed');
        }

        if (status == 200 && data) {
          return data;
        }

        return null;
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
          // refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {

      session.user.accessToken = token.accessToken;
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