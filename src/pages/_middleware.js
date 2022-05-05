import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET

export default (req) => {

  const { cookies } = req

  const jwt = cookies[process.env.COOKIE_NAME]

  const url = req.nextUrl.clone()

  if (url.pathname.includes('/signin')) {
    if (jwt) {
      try {
        verify(jwt, secret)

        url.pathname = '/app/dashboard'
        return NextResponse.rewrite(url)
      } catch (error) {
        return NextResponse.next()
      }
    }
  }

  if (url.pathname.includes('/app')) {
    if (!jwt) {
      url.pathname = '/signin'
      return NextResponse.rewrite(url)
    }

    try {
      verify(jwt, secret)

      return NextResponse.next()
    } catch (error) {
      url.pathname = '/signin'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}