import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const redirectLocal = (req: NextRequest, newPathname: string) => {
  const nextUrl = req.nextUrl;
  const url = nextUrl.clone();
  const newUrl = url.clone();
  newUrl.pathname = newPathname;

  return NextResponse.rewrite(newUrl);
};

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const idKey = req.cookies.idKey;
  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;
  const res = NextResponse.next();
  try {
    switch (true) {
      // /api/login
      case pathname.split('/')[1] === 'api' &&
        pathname.split('/')[2] === 'login':
        return res;
      case !idKey:
        return redirectLocal(req, '/users/login');
      default:
        return res;
    }
  } catch (e) {
    return redirectLocal(req, '/404');
  }
}
