import { NextResponse } from "next/server";
import { getLDClient } from "@/lib/ld-server";
import { cookies } from "next/headers";

const USER_COOKIE_NAME = "ld_user";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Update the user context on the server side
    const user = {
      key: email,
      email: email,
      anonymous: false,
    };

    // Get the shared LaunchDarkly client instance
    const client = await getLDClient();

    // Identify the user with LaunchDarkly
    await client.identify(user);

    // Create response with user data
    const response = NextResponse.json({ success: true });

    // Set cookie in response
    response.cookies.set(USER_COOKIE_NAME, JSON.stringify(user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Error updating user context:", error);
    return NextResponse.json(
      { error: "Failed to update user context" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get(USER_COOKIE_NAME);

    if (!userCookie) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    const user = JSON.parse(userCookie.value);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting user context:", error);
    return NextResponse.json(
      { error: "Failed to get user context" },
      { status: 500 }
    );
  }
}
