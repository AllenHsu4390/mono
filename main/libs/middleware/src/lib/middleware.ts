import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import { allLinks, isValidEdge } from '@main/state-machine';

export const redirectLocal = (req: NextRequest, newPathname: string) => {
  const nextUrl = req.nextUrl;
  const url = nextUrl.clone();
  const newUrl = url.clone();
  newUrl.pathname = newPathname;

  return NextResponse.rewrite(newUrl);
};

const reqToApiKey = (req: NextRequest) => {
  // convert to path pattern
  return `${req.method}:${req.nextUrl.pathname}`;
};

const hasApiKey = (req: NextRequest) => {
  return allLinks.has(reqToApiKey(req));
};

const getApiState = (apiStateKey: string) => {
  return allLinks.get(apiStateKey);
};

const setApiState = (res: NextResponse, apiStateKey) => {
  const cookieValue = `apiKey=${apiStateKey}; Secure; Path=/; HttpOnly;`;
  res.headers.set('set-cookie', cookieValue);
  return res;
};

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const idKey = req.cookies.idKey;
  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;
  const res = NextResponse.next();

  switch (true) {
    case pathname.split('/')[1] === 'api':
      return res;
    case !idKey:
      return redirectLocal(req, '/users/login');
    case pathname === '/':
      return redirectLocal(req, '/0');
    default:
      return res;
  }
}
