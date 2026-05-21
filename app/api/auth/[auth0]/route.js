// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  // const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  // const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  // const auth0Config = {
  //     domain: auth0Domain,
  //     clientID: auth0ClientId,
  // }
  login: handleLogin({
    authorizationParams: {
      prompt: "login",
    },
    returnTo: "/",
  }),
  signup: handleLogin({
    authorizationParams: {
      prompt: "signup",
    },
    returnTo: "/",
  }),
});