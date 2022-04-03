import { NextResponse, NextRequest } from 'next/server';

const redirectLocal = (req: NextRequest, newPathname: string) => {
  const nextUrl = req.nextUrl;
  const url = nextUrl.clone();
  const newUrl = url.clone();
  newUrl.pathname = newPathname;

  return NextResponse.rewrite(newUrl);
};

export async function middleware(req: NextRequest) {
  const idKey = req.cookies.idKey;
  const nextUrl = req.nextUrl;

  switch (true) {
    case nextUrl.pathname.split('/')[1] === 'api':
      return NextResponse.next();
    case !idKey:
      return redirectLocal(req, '/login');
    case nextUrl.pathname === '/':
      return redirectLocal(req, '/0');
    default:
      NextResponse.next();
  }
}
