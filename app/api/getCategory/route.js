import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  try {
    const category = await prisma.category.findUnique({
      where: { category_id: id },
    });

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(null, { status: 500 });
  }
}