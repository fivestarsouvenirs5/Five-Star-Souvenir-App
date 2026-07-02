import prisma from "../../utils/prisma";

export async function POST(request) {
  try {
    const rows = await request.json();

    const updates = rows.map((row) =>
      prisma.delivery_date.update({
        where: {
          delivery_id: parseInt(row.id),
        },
        data: {
          month: row.m,
          number: parseInt(row.n),
          year: parseInt(row.y),
        },
      })
    );

    await Promise.all(updates);

    const updated = await prisma.delivery_date.findMany();

    return new Response(
      JSON.stringify({ updated }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error updating deliveries:",
      error
    );

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}