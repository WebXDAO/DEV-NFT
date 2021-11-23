import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {

  // Github OAuth connexion
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options);
