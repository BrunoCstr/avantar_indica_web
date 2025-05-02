import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse(JSON.stringify({message: "Logout succesful"}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  response.cookies.set("authToken", "", {
    expires: new Date(0),
    path: "/" 
  })

  return response;
}