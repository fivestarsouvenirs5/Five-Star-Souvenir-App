import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

async function getAppMetadata(email) {
  try {
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_API_CLIENT_ID,
        client_secret: process.env.AUTH0_API_CLIENT_SECRET,
        audience: process.env.AUTH0_API_ID,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email`,
      {
        params: { email },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return userResponse.data[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return {
      session: null,
      userMetadata: null,
      isSignedIn: false,
    };
  }

  const userMetadata = await getAppMetadata(session.user.email);

  return {
    session,
    userMetadata,
    isSignedIn: true,
  };
}