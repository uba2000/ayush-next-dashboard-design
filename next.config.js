module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: `${process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://next-dashboard-design.vercel.app'}`,
    OPEN_API: 'https://scai-rhasi6a2qa-uc.a.run.app',
  },
}
