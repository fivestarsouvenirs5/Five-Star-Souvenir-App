import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

async function getManagementToken() {
  const response = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  return response.json();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session || !session.user) {  
    return {
      session: null,
      userMetadata: null,
      isSignedIn: false,
    };
  }

 const tokenData = await getManagementToken();

    const response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(
        session.user.sub
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        }});

  if (!response.ok) {
    console.error("Failed to fetch user metadata");
    return {
      session,
      userMetadata: null,
      isSignedIn: true,
    };
  }

  const user = await response.json();

  return {
    user,
    isSignedIn: true,
  };
}