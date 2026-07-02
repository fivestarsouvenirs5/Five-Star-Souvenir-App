import prisma from '../../utils/prisma';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        category_location: 1,
      },
      orderBy: {
        category: "asc",
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching NY categories:", error);

    return NextResponse.json(
      { error: "Failed to fetch NY categories" },
      { status: 500 }
    );
  }
}