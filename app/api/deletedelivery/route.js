import prisma from '../../utils/prisma';

export async function DELETE(request) {
  try {
    const dateDetails = await request.json();

    await prisma.delivery_date.delete({
      where: {
        delivery_id: parseInt(dateDetails.id),
      },
    });

    return new Response(JSON.stringify({ message: "Success" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
