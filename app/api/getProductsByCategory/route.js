import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const products = await prisma.products.findMany({
      where: { category_id: id },
      orderBy: {
        product_name: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("getProductsByCategory error:", err);

    return NextResponse.json([], { status: 500 });
  }
}