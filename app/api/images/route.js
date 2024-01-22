import { NextResponse } from "next/server";
import prisma from '../../utils/prisma';

export async function GET(request) {
    const {image_id} = await request.json();
    console.log(image_id)
    const imageResult = await prisma.images.findUnique({
        where: { image_id: image_id },
      });
      console.log(imageResult)
      return NextResponse.json(imageResult)
      
}