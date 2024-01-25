import { PrismaClient } from "@prisma/client"
import {NextResponse} from "next/server"
const prisma = new PrismaClient();

export async function POST(request) {
    const { first_name } = await request.json()
    console.log(first_name);
    const { last_name } = await request.json()
    const { phone_number } = await request.json()
    const { email } = await request.json()
    // const {approval_status} = await request.json()
    console.log( first_name )
    console.log( last_name )
    console.log( phone_number )
    console.log( email )
    // console.log( approval_status )
    const result = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phonenumber: phone_number,
        //   approval_status: approval_status,
        },
      })
      console.log("created record")
      return NextResponse.json(result)
}