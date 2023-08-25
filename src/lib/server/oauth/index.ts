// Hello everyone, we're gonna be making the discord Oauth as fast as we can! It's currently 6:25 and I am starting on it :trol:

import { dev } from '$app/environment';
import { PUBLIC_DISCORD_OAUTH_ID } from '$env/static/public';
import { DISCORD_OAUTH_SECRET } from '$env/static/private';
import type { DiscordAccessTokenResponse } from '$lib/types/discord';
import { error } from '@sveltejs/kit';

const oauthAPIBase = 'https://discord.com/api/oauth2/';

const scope = encodeURIComponent('connections guilds.members.read identify');

//TODO: Change this to production URL or make ternary
const callBackURL = dev ? 'http://localhost:5173/login/callback' : 'https://apply.sirius.menu/login/callback';

export const ExchangeAccessToken = async (code: string): Promise<DiscordAccessTokenResponse> => {
  const body = new URLSearchParams();
  body.set('client_id', PUBLIC_DISCORD_OAUTH_ID);
  body.set('client_secret', DISCORD_OAUTH_SECRET);
  body.set('grant_type', 'authorization_code');
  body.set('code', code);
  body.set('redirect_uri', callBackURL);
  const resp = await fetch(oauthAPIBase + 'token', { body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, method: 'POST' });
  if (resp.status != 200) {
    // TODO: Make proper error lol
    throw error(400, (await resp.json()).error_description);
  }
  return (await resp.json()) as DiscordAccessTokenResponse;
};

export const GetAuthorizationURL = (state: string, prompt: 'consent' | 'none'): string => {
  return oauthAPIBase + `authorize?response_type=code&client_id=${PUBLIC_DISCORD_OAUTH_ID}&scope=${scope}&redirect_uri=${encodeURIComponent(callBackURL)}&prompt=${prompt}&state=${state}`;
};
