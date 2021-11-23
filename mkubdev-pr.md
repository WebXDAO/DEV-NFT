# DEV-NFT First PR

## Init the next-js application with tailwind

* We use `npx create-next-app -e with-tailwindcss` to generate the nextjs app.

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