import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as z from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
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

    if (!session) throw redirect(302, '/');
    // Validate the form itself
    const form = await superValidate(await event.request.clone().formData(), z.object({ name: z.string().min(1), siriusDiscovery: z.string().min(1), spareTime: z.string().min(1), question1: z.string().min(1), question2: z.string().min(1), question3: z.string().min(1), question4: z.string().min(1), question5: z.string().min(1), question6: z.string().min(1), question7: z.string().min(1), question8: z.string().min(1), question9: z.string().min(1), contactStaff: z.string().min(2), contactInfo: z.string().min(2), data: z.string().min(2) }));

    if (!form.valid) return fail(400, { form });

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

    const data = form.data;

    const questions: string[] = [];
    for (const key in data) {
      if (key.startsWith('question')) {
        // hack to make ts' compiler approve of it
        questions.push(data[key as keyof typeof data]);
      }
    }

    const responses: FormResponses = {
      Discovery: form.data.siriusDiscovery,
      SpareTime: form.data.spareTime,
      Questions: questions
    };

    const agreements: FormAgreements = {
      Staff: form.data.contactStaff == 'on',
      Info: form.data.contactInfo == 'on'
    };

    // create and save new app
    const app: Application = {
      _id: v4(),
      name: form.data.name,
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
      props: form
    };
  }
};
