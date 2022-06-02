import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const redirectLocal = (req: NextRequest, newPathname: string) => {
  const url = req.nextUrl.clone();
  url.pathname = newPathname;
  url.search = '';

  return NextResponse.redirect(url);
};

const pieceMatch = (a: string[], b: string[]) => {
  if (a.length !== b.length && !b.includes('*')) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (b[i][0] === ':') {
      continue;
    }
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const isPublicPath = (pathname: string) => {
  const pieces = pathname.split('/');

  return !![
    '/api/login',
    '/api/login/:id/:iv',
    '/api/creators/:id',
    '/api/assets',
    '/api/assets/:id',
    '/api/assets/:id/likes/count',
    '/404',
    '/users/login',
    '/galleries/:creatorId',
    '/assets/:assetId',
    '/',
    '/favicon.ico',
  ].find((path) => pieceMatch(pieces, path.split('/')));
};

export const isPrivatePath = (pathname: string) => {
  const pieces = pathname.split('/');

  return !!['/api/*'].find((path) => pieceMatch(pieces, path.split('/')));
};

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const idKey = req.cookies.idKey;
  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;
  const res = NextResponse.next();
  try {
    switch (true) {
      case isPublicPath(pathname):
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
