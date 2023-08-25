import mongoose from 'mongoose';
import type { Application } from '$lib/types/application';
import type { DiscordUser } from '$lib/server/types/database';

const schema = new mongoose.Schema<Application>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    discord: { type: Object, required: false, default: {} as DiscordUser },
    responses: { type: Object, required: true },
    agreements: { type: Object, required: true },
    status: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    Reviewer: { type: Object, required: false, default: {} as DiscordUser['User'] }
  },
  { versionKey: false }
);

export default mongoose.connection.models.applications || mongoose.connection.model('applications', schema);
