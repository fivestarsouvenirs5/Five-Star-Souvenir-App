import axios from "axios";
import prisma from "../../utils/prisma";

export async function POST(request) {
    try {
        const myRequest = await request.json();
        const userId = myRequest.userId;

        // Get Auth0 Management API access token
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

        // Delete all stores associated with this user
        const deletedStores = await prisma.stores.deleteMany({
            where: {
                user_id: userId,
            },
        });

        console.log(`Deleted ${deletedStores.count} stores`);

        // Delete the Auth0 user
        await axios.delete(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
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
                message: "User and associated stores deleted successfully",
                storesDeleted: deletedStores.count,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {
        console.error("Error deleting user:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to delete user",
                error: error.message,
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