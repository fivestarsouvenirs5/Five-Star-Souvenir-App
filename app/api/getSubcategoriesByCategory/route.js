import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const subcategories = await prisma.subcategories.findMany({
      where: { catg_id: id },
      orderBy: {
        subcategory_name: "asc",
      },
    });

    return NextResponse.json(subcategories);
  } catch (err) {
    console.error("getSubcategoriesByCategory error:", err);

    return NextResponse.json([], { status: 500 });
  }
}