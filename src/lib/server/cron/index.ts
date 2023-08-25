import { CronJob } from 'cron';
import mongoose from 'mongoose';
import { connectionStatus, connectToDB } from '../database';
import Applications from '$lib/server/database/models/application';
import type { Application } from '../../types/application';

export const PurgeDB = new CronJob(
  '0 0 * * *',
  async () => {
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}
    const startTime = Date.now();
    const apps = await Applications.find({});
    let totalAppsDeleted = 0;
    apps.forEach(async (app: Application) => {
      if (!app.Reviewer || !app.updatedAt) return;
      if (app.updatedAt.getTime() + 12096e5 < Date.now()) {
        await Applications.findByIdAndRemove(app._id);
      }
      totalAppsDeleted++;
    });
    console.log(`Deleted ${totalAppsDeleted} old applications in ${Date.now() - startTime} seconds`);
  },
  null,
  true
);
