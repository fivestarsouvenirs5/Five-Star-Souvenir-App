import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  try {
    const products = await prisma.products.findMany({
      where: { subcategory_id: id },
    });

    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}