import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import Applications from '$lib/server/database/models/application';
import { validateSession } from '$lib/server/auth/';
import { connectionStatus, connectToDB } from '$lib/server/database';
import mongoose from 'mongoose';
import { ApplicationStatus, type Application } from '$lib/types/application';

export const load: PageServerLoad = async ({ cookies }) => {
  const s = await validateSession(cookies);
  if (!s) {
    throw redirect(302, '/login');
  }

  if (!s.user.reviewer && !s.user.support) throw redirect(302, '/unauthorized');
  // Load all applications
  try {
    if (connectionStatus.status != mongoose.ConnectionStates.connected) {
      await connectToDB();
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}

  const apps: Application[] = [];

  const fetchedApps = await Applications.find({});

  fetchedApps.map((a) => apps.push(a.toObject({ getters: false }) as Application));

  // Sort the apps so that the pending ones are at the top, accepted ones next and declined ones last
  apps.sort((a, b) => {
    if (a.status === b.status) {
      return 0; // a and b have the same status, so their order doesn't matter
    } else if (a.status === ApplicationStatus.PENDING) {
      return -1; // a has PENDING status, so it should come before b
    } else if (b.status === ApplicationStatus.PENDING) {
      return 1; // b has PENDING status, so it should come before a
    } else if (a.status === ApplicationStatus.ACCEPTED) {
      return -1; // a has ACCEPTED status and b has DENIED status, so a should come before b
    } else {
      return 1; // a has DENIED status and b has ACCEPTED status, so b should come before a
    }
  });

  return {
    streamed: {
      applications: structuredClone(apps)
    }
  };
};

export const actions: Actions = {
  // delete all applications
  deleteAllApplications: async ({ params, cookies }) => {
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const ses = await validateSession(cookies);
    if (!ses) throw redirect(302, '/login');

    if (!ses.user.reviewer) throw redirect(302, '/unauthorized');

    await Applications.deleteMany({});
    throw redirect(302, '/dashboard');
  }
};
