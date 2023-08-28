import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import Applications from '$lib/server/database/models/application';
import { ApplicationStatus, type FormResponses, type FormAgreements } from '$lib/types/application';
import { v4 } from 'uuid';
import { connectionStatus, connectToDB } from '$lib/server/database/index';
import mongoose from 'mongoose';
import type { PageServerLoad } from './$types';
import type { Application } from '$lib/types/application';
import { validateSession } from '$lib/server/auth';
import { DISCORD_BOT_TOKEN } from '$env/static/private';

const botDetect = new RegExp('/(bot)/gm');

export const load = (async (event) => {
  const sess = await validateSession(event.cookies);
  const ua = event.request.headers.get('User-Agent');
  if (!ua || botDetect.test(ua as string)) {
    return {};
  }

  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const session = await validateSession(event.cookies);

    const data = await event.request.clone().formData();

    if (!session) throw redirect(302, '/');
    try {
      if (connectionStatus.status != mongoose.ConnectionStates.connected) {
        await connectToDB();
      }
      // eslint-disable-next-line no-empty
    } catch (_) {}

    const existingApplication: Document[] = await Applications.find({ $or: [{ 'discord.User.id': session.user.discord.User.id }] });

    if (existingApplication.length !== 0) {
      return fail(400, {
        message: "You've already submitted an application!"
      });
    }

    const questions: string[] = [];
    data.forEach((value, key) => {
      if (key.startsWith('question')) {
        questions.push(value as string);
      }
    });

    const responses: FormResponses = {
      Discovery: data.get('siriusDiscovery') as string,
      SpareTime: data.get('spareTime') as string,
      Questions: questions
    };

    const agreements: FormAgreements = {
      Staff: data.contactStaff == 'on',
      Info: data.contactInfo == 'on'
    };

    // create and save new app
    const app: Application = {
      _id: v4(),
      name: data.get('name') as string,
      responses,
      agreements,
      createdAt: new Date(),
      status: ApplicationStatus.PENDING,
      discord: session.user.discord
    };

    const application = await new Applications(app).save();
    if (application._id) {
      try {
        const embed = {
          embeds: [
            {
              title: 'New Application',
              description: `**${await application.discord.User.username}** has submitted an application!`,
              fields: [
                {
                  name: 'Name',
                  value: `${await application.name}`,
                  inline: true
                },
                {
                  name: 'Discord ID',
                  value: `\`${await application.discord.User.id}\``,
                  inline: true
                },
                {
                  name: 'Discord Account',
                  value: `<@${await application.discord.User.id}>`,
                  inline: true
                }
              ],
              color: 2829617,
              author: {
                name: '‎',
                icon_url: `${await application.discord.User.avatar}`
              }
            }
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: 'View Application',
                  style: 5,
                  url: `https://apply.sirius.menu/dashboard/${await application._id}`
                }
              ]
            }
          ]
        };

        const res = await fetch('https://discord.com/api/v10/channels/1123968511388164128/messages', {
          method: 'POST',
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(embed)
        });

        if (!res.ok) {
          console.error(await res.text());
        }
      } catch (e) {
        console.error(e);
      }
    }
    return {
      props: {}
    };
  }
};
