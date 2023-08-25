import type { User } from '$lib/server/types/database';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<User>(
  {
    _id: { type: String, required: true },
    discord: { type: Object, required: true },
    reviewer: { type: Boolean, required: false },
    support: { type: Boolean, required: false }
  },
  { versionKey: false }
);

export default mongoose.connection.models.users || mongoose.connection.model('users', schema);
