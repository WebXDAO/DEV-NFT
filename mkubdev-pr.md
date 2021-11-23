# DEV-NFT Project initialization and configuration

## Init the nextjs application with tailwind

* We use `npx create-next-app -e with-tailwindcss` to generate the nextjs app with the tailwind library configured.

> This command add postcss and autoprefixer packages.

## Add next-auth library

* We use `npm i next-auth` to add the library to the application.

### Add API route

To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configuration.

```js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
})
```
All requests to `/api/auth/*` (`signIn`, callback, `signOut`, etc.) will automatically be handled by NextAuth.js.

### Configure session state

To be able to use `useSession` first you'll need to expose the session context, `<Provider />`, at the top level of our application:

```js
// pages/_app.js
import { Provider } from "next-auth/client"


function MyApp({ Component, pageProps }) {
  return (
    <Provider session={ pageProps.session }>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
```

Instances of useSession will then have access to the session data and status. The `<SessionProvider />` also takes care of keeping the session updated and synced between browser tabs and windows.

## Add Web3 packages...

> @Todo: add link to lib below

We need somes libraries :
- ethers
- hardhat
- @nomiclabs/hardhat-waffle
- ethereum-waffle
- chai
- @nomiclabs/hardhat-ethers
- web3modal
- @openzeppelin/contracts
- ipfs-http-client
- axios

We use `npm add ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios` to install them.