
import { NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { getSession } from "@auth0/nextjs-auth0";

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

export async function PATCH(req) {
  try {
    const formData = await req.formData();

    const session = await getSession();

    const user_id = session.user.sub;
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const photoFile = formData.get("photo");

    let blob;
    if (photoFile && photoFile.size > 0) {
        blob = await put( `profile-pictures/${Date.now()}_${firstName}_${lastName}`, photoFile, {
            access: 'public',
        });
    }

    const tokenData = await getManagementToken();

    const response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(
        user_id
      )}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: blob ? JSON.stringify({
          name: firstName,
          given_name: lastName,
          email: email,
          picture: blob.url,

          user_metadata: {
            phonenumber: phoneNumber,
          },
        }) :
        JSON.stringify({
          name: firstName,
          given_name: lastName,
          email: email,

          user_metadata: {
            phonenumber: phoneNumber,
          },
        }),
      }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Auth0 API error:", errorData);
        return NextResponse.json(
          { error: "Failed to update profile" },
          { status: 500 }
        );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}