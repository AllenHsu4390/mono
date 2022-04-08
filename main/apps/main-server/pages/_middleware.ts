import { NextFetchEvent, NextRequest } from 'next/server';
import { middleware as myMiddleware } from '@main/middleware';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  return myMiddleware(req, event);
}
