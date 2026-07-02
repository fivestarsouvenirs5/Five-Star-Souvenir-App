import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getUserInfo";

export async function GET() {
  try {
    const data = await getCurrentUser();

    return NextResponse.json({
      myUser: data.userMetadata || null,
      isSignedIn: data.isSignedIn,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to get user",
      },
      {
        status: 500,
      }
    );
  }
}