import axios from "axios";

export async function POST(request) {
    try {
        const { userId } = await request.json();

        // 1. Get Auth0 Management API token
        const tokenResponse = await axios.post(
            `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AUTH0_API_CLIENT_ID,
                client_secret: process.env.AUTH0_API_CLIENT_SECRET,
                audience: process.env.AUTH0_API_ID,
            }),
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        // 2. Update user metadata in Auth0
        const response = await axios.patch(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
            {
                user_metadata: {
                    adminapproval: 'true',
                },
            },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return new Response(
            JSON.stringify({
                success: true,
                message: "User approved successfully",
                user: response.data,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error approving user:", error?.response?.data || error.message);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to approve user",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}