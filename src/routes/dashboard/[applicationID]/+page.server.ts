import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import Applications from '$lib/server/database/models/application';
import { validateSession } from '$lib/server/auth';
import { connectionStatus, connectToDB } from '$lib/server/database';
import mongoose from 'mongoose';
import { ApplicationStatus, type Application } from '$lib/types/application';
import { addUserAcceptedRole, sendAcceptLog, sendDenyLog } from '$lib/server/bot';
import { ParseStatusApplication } from '$lib/Applications';

export const load: PageServerLoad = async ({ params, cookies }) => {
  const session = await validateSession(cookies);
  if (!session) {
    throw redirect(302, '/login');
  }

  if (!session.user.reviewer && !session.user.support) throw redirect(302, '/unauthorized');

  try {
    if (connectionStatus.status != mongoose.ConnectionStates.connected) {
      await connectToDB();
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}

  const application: Application = await Applications.findById(params.applicationID).exec();

  if (!application) throw redirect(302, '/dashboard');

  const applications = (await Applications.find({})).map((app) => app.toObject({ getters: false }) as Application);

  applications.sort((a, b) => {
    if (a.status === b.status) {
      // if both applications have the same status, sort by custom order
      if (a.status === ApplicationStatus.PENDING) {
        // if both applications have PENDING status, maintain their original order
        return 0;
      } else if (a.status === ApplicationStatus.ACCEPTED) {
        // if both applications have ACCEPTED status, maintain their original order
        return 0;
      } else {
        // if both applications have DENIED status, maintain their original order
        return 0;
      }
    } else {
      // sort applications by status
      return a.status - b.status;
    }
  });

  return {
    parsedStatus: ParseStatusApplication(application.status),
    application: JSON.parse(JSON.stringify(application)) as Application,
    streamed: {
      applications
    }
  };
};

export const actions: Actions = {
  acceptApplication: async ({ params, cookies }) => {
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const ses = await validateSession(cookies);
    if (!ses) throw redirect(302, '/login');

    if (!ses.user.reviewer) throw redirect(302, '/unauthorized');

    const reviewer = ses.user;
    const application = ((await Applications.findById(params.applicationID)) as mongoose.Document<string, null, Application> | null)?.toObject({ getters: false }) as Application;
    if (!application) {
      throw error(404, 'Application not found!');
    }

    application.status = ApplicationStatus.ACCEPTED;
    application.Reviewer = reviewer.discord.User;
    application.updatedAt = new Date();

    await Applications.findByIdAndUpdate(application._id, application);

    // add roles
    await addUserAcceptedRole(application.discord.User.id, '1123957045360595015', `Application approved by ${reviewer.discord.User.username}`);
    await addUserAcceptedRole(application.discord.User.id, '1123957475637465210', `Application approved by ${reviewer.discord.User.username}`);

    await sendAcceptLog(application.discord, application);

    throw redirect(302, '/dashboard/' + params.applicationID);
  },
  rejectApplication: async ({ params, cookies }) => {
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const ses = await validateSession(cookies);
    if (!ses) throw redirect(302, '/login');

    if (!ses.user.reviewer) throw redirect(302, '/unauthorized');

    const reviewer = ses.user;
    const application = ((await Applications.findById(params.applicationID)) as mongoose.Document<string, null, Application> | null)?.toObject({ getters: false }) as Application;
    if (!application) {
      throw error(404, 'Application not found!');
    }

    application.status = ApplicationStatus.DENIED;
    application.Reviewer = reviewer.discord.User;
    application.updatedAt = new Date();

    await Applications.findByIdAndUpdate(application._id, application);

    // Send messages
    await sendDenyLog(application.discord, application);

    throw redirect(302, '/dashboard/' + params.applicationID);
  },
  deleteApplication: async ({ params, cookies }) => {
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const ses = await validateSession(cookies);
    if (!ses) throw redirect(302, '/login');

    if (!ses.user.reviewer) throw redirect(302, '/unauthorized');

    await Applications.findByIdAndDelete(params.applicationID);
    throw redirect(302, '/dashboard');
  }
};
