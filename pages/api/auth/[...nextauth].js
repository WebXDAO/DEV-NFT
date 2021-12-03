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
        // All data come from github, need to find a way to surcharge the session object
        // from the callbacks bellow :
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
    })],

  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,

  callbacks: {
    jwt: async ( token, user ) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "profile" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.profile = user)
      return token
    },
    session: async ( session, token ) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = token.user
      return token
    },

    // redirect: async ( url, baseUrl ) => {
    //   return '/creator-dashboard'
    // },
  }
}

export default (req, res) => NextAuth(req, res, options);
