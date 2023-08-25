import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth';

const clearSession = (async ({ cookies }) => {
  await deleteSession(cookies);
  throw redirect(302, '/');
}) satisfies RequestHandler;

export const POST = clearSession;
export const GET = clearSession;
