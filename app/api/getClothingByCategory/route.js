import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const clothing = await prisma.clothing_product_size.findMany({
      where: { category_id: id },
    });

    return NextResponse.json(clothing);
  } catch (err) {
    console.error("getClothingByCategory error:", err);

    return NextResponse.json([], { status: 500 });
  }
}