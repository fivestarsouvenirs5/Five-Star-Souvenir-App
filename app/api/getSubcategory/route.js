import prisma from "../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  try {
    const subcategory = await prisma.subcategories.findUnique({
      where: { subcategory_id: id },
    });

    return NextResponse.json(subcategory);
  } catch (err) {
    return NextResponse.json(null, { status: 500 });
  }
}