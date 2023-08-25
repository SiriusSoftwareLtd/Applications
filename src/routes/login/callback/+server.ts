import { hash } from '$lib/server/hash';
import { redirect, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { OAuthResponse } from '$lib/types/discord';
import { ExchangeAccessToken } from '$lib/server/oauth';
import { GenerateUserFromAccessToken } from '$lib/server/oauth/discord/';
import { connectionStatus, connectToDB } from '$lib/server/database';
import mongoose from 'mongoose';
import Users from '$lib/server/database/models/user';
import { v4 } from 'uuid';
import { newSession } from '$lib/server/auth';

export const GET = (async ({ url, getClientAddress, cookies }) => {
  // 1 = code, 2 = state
  const responses: OAuthResponse[] = [];

  url.searchParams.forEach((v, k) => responses.push({ name: k, value: v }));

  if (hash(getClientAddress()).substring(0, responses[1].value.length) != responses[1].value) return text('state invalid', { status: 401 });

  const resp = await ExchangeAccessToken(responses[0].value);
  resp.expires_at = new Date().getTime() / 1000 + resp.expires_in;

  const us = await GenerateUserFromAccessToken(resp);

  try {
    if (connectionStatus.status != mongoose.ConnectionStates.connected) {
      await connectToDB();
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}

  const existing = await Users.findOne({ 'discord.User.id': us.discord.User.id });
  if (!existing) {
    us._id = hash(v4());
    await new Users(us).save();
  } else {
    // update the user's info <3
    us._id = existing._id;
    await Users.findByIdAndUpdate(existing._id, us);
  }
  // here we create the session:
  await newSession(cookies, us._id);

  throw redirect(302, us.reviewer || us.support ? '/dashboard' : '/');
}) satisfies RequestHandler;
