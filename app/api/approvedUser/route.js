import axios from "axios";
import prisma from '../../utils/prisma'

export async function POST(request) {
    try {

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

    
        const userResponse = await axios.get(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
            {
                params: {
                    q: 'user_metadata.adminapproval: "true"',
                    search_engine: "v3",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const users = userResponse.data;


        const userIds = users.map((user) => user.user_id);


        const stores = await prisma.stores.findMany({
            where: {
                user_id: {
                    in: userIds,
                },
            },
        });

        // Attach stores to each user
        const usersWithStores = users.map((user) => ({
            ...user,
            stores: stores.filter(
                (store) => store.user_id === user.user_id
            ),
        }));

        return new Response(JSON.stringify(usersWithStores), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });

    } catch (error) {
        console.error("Error fetching approved users and stores:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to fetch users and stores",
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
}