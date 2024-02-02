import { PrismaClient } from "@prisma/client"
import {NextResponse} from "next/server"
const prisma = new PrismaClient();

export async function POST(request) {
    const {req} = await request.json();
    // const { first_name } = await request.json()
    // console.log(first_name);
    // const { last_name } = await request.json()
    // const { phone_number } = await request.json()
    // const { email } = await request.json()
    // // const {approval_status} = await request.json()
    // console.log( first_name )
    // console.log( last_name )
    // console.log( phone_number )
    // console.log( email )
    // console.log( approval_status )
    const result = await prisma.user.create({
        data: {
          first_name: req.firstname,
          last_name: req.lastname,
          email: req.user_email,
          phonenumber: req.phonenumber,
        //   approval_status: approval_status,
        },
      })
      console.log("created record")
      return NextResponse.json(result)
}