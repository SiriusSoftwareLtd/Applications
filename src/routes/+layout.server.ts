import type { LayoutServerLoad } from './$types';
import { validateSession } from '../lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const resp = await validateSession(cookies);
  if (resp == null) {
    return {};
  }
  return { user: structuredClone(resp.user) };
};
