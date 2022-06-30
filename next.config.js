module.exports = {
  reactStrictMode: true,
  env: {
    ENC_SECRET: 'scai###encrtp##32983t53908##tion#2134488i2psecret032084?##',
    // PAYPAL_CLIENT_ID: '',
    // PAYPAL_CLIENT_SECRET: '',
    BASE_URL: `${
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:3000'
        : 'https://next-dashboard-design.vercel.app'
    }`,
    OPEN_API: `${
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:3000'
        : 'https://next-dashboard-design.vercel.app'
    }`,
    // OPEN_API: 'https://scai-rhasi6a2qa-uc.a.run.app',
  },
};
