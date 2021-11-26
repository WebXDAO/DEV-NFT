import { getJsonWalletAddress } from '@ethersproject/json-wallets'
import NextAuth from 'next-auth'
import { session, signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'

const options = {

  // Next-Auth: Github OAuth connexion
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        // La on a toute les data...
        // console.log("profile", profile)
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
          company: profile.company,
          repos_count: profile.public_repos,
          followers: profile.followers
        }
      }
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log("Sign in call back user:");
      console.log(user);

      // return user;
      // user && (token.user = user)
      return user
    },
    session: async ({ session, token }) => {
      console.log("sessio,", session)
      console.log("sessio,", token)

        // session.user = token.user
        // return session
    }
  }
  
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options);
