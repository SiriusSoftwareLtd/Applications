<script lang="ts">
  import type { PageData } from './$types';
  import Header from '../components/Header.svelte';
  import Stats from '../components/Stats.svelte';
  import Answers from '../components/Answers.svelte';
  import RadioContainer from '../components/RadioContainer.svelte';
  import Radio from '../components/Radio.svelte';

  export let data: PageData;

  console.log(data);
</script>

<Header />
<div class="space-y-6 px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-72">
  <Stats />
  <div class="overflow-hidden border-2 border-neutral-700 border-opacity-40 bg-[#050505] shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-neutral-200">Introductory Questions</h3>
      <p class="mt-1 max-w-2xl text-sm text-neutral-400">Before we begin, we'd like to get to know you, as a person, before getting to know about your skills and what you can bring to the team.</p>
    </div>
    <div class="border-t border-neutral-800 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-neutral-800">
        <Answers title="What should we call you?" value={data.application.name} />
        <Answers title="Where did you hear about Sirius?" value={data.application.responses.Discovery} />
        <Answers title="What do you like to do, in your spare time?" value={data.application.responses.SpareTime} />
      </dl>
    </div>
  </div>
  <div class="overflow-hidden border-2 border-neutral-700 border-opacity-40 bg-[#050505] shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-neutral-200">Multiple-Choice Questions</h3>
      <p class="mt-1 max-w-2xl text-sm text-neutral-400">For the following questions, choose the best, and most appropriate answer in your opinion so we can assess your knowledge of customer service</p>
    </div>
    <div class="border-t border-neutral-800 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-neutral-800">
        <Answers title="Which of the following is the most appropriate response if a user is engaging in inappropriate behavior in the server?">
          <RadioContainer title="Which of the following is the most appropriate response if a user is engaging in inappropriate behavior in the server?" name="question1">
            <Radio value="1" id="question1-1" name="question1" description="Threaten to punish the user immediately" checked={data.application.responses.Questions[0] === '1'} />
            <Radio value="2" id="question1-2" name="question1" description="Report the user to a higher-up" checked={data.application.responses.Questions[0] === '2'} rightAnswer={true} />
            <Radio value="3" id="question1-3" name="question1" description="Confront the user and tell them to stop" checked={data.application.responses.Questions[0] === '3'} rightAnswer={true} />
            <Radio value="4" id="question1-4" name="question1" description="Ignore the behavior and hope it goes away" checked={data.application.responses.Questions[0] === '4'} />
          </RadioContainer>
        </Answers>
        <Answers title="Which of the following is the most effective way to communicate with a user who has a technical issue?">
          <RadioContainer title="Which of the following is the most effective way to communicate with a user who has a technical issue?" name="question2">
            <Radio value="1" id="question2-1" name="question2" description="Use technical jargon to show off your expertise" checked={data.application.responses.Questions[1] === '1'} />
            <Radio value="2" id="question2-2" name="question2" description="Speak slowly and use simple language to explain the issue" checked={data.application.responses.Questions[1] === '2'} rightAnswer={true} />
            <Radio value="3" id="question2-3" name="question2" description="Ignore the user's technical concerns and focus on resolving the issue" checked={data.application.responses.Questions[1] === '3'} rightAnswer={true} />
            <Radio value="4" id="question2-4" name="question2" description="Offer to remote into the user's device to fix the issue yourself" checked={data.application.responses.Questions[1] === '4'} />
          </RadioContainer>
        </Answers>
        <Answers title="A user is experiencing a technical issue with their device that is beyond your expertise. What should you do?">
          <RadioContainer title="A user is experiencing a technical issue with their device that is beyond your expertise. What should you do?" name="question3">
            <Radio value="1" id="question3-1" name="question3" description="Tell them to figure it out on their own" checked={data.application.responses.Questions[2] === '1'} />
            <Radio value="2" id="question3-2" name="question3" description="Ask a developer, or a more experienced support member for help" checked={data.application.responses.Questions[2] === '2'} rightAnswer={true} />
            <Radio value="3" id="question3-3" name="question3" description="Tell them it works for you, so it's not your problem" checked={data.application.responses.Questions[2] === '3'} />
            <Radio value="4" id="question3-4" name="question3" description="Ignore their issue and move on to another ticket" checked={data.application.responses.Questions[2] === '4'} />
          </RadioContainer>
        </Answers>
      </dl>
    </div>
  </div>
  <div class="overflow-hidden border-2 border-neutral-700 border-opacity-40 bg-[#050505] shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-neutral-200">Formal Questions</h3>
      <p class="mt-1 max-w-2xl text-sm text-neutral-400">Now, we'd like to see how you'd fit into our team of support and staff, and if you're capable of keeping high standards while being friendly.</p>
    </div>
    <div class="border-t border-neutral-800 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-neutral-800">
        <Answers title="What inspired you to apply for the role of a support member, and what do you believe you can bring to the team?" value={data.application.responses.Questions[3]} />
        <Answers title="What customer service experience do you have, and how do you handle difficult customers or situations?" value={data.application.responses.Questions[4]} />
        <Answers title="Have you ever encountered a technical issue that you didn't know how to solve? If so, how did you go about finding a solution?" value={data.application.responses.Questions[5]} />
        <Answers title="How would you handle a situation where a user is upset or frustrated about their experience with Sirius?" value={data.application.responses.Questions[6]} />
        <Answers title="What do you believe is the most important quality for a support member to possess, and why?" value={data.application.responses.Questions[7]} />
        <Answers title="How would you handle a situation where a user is making a fraudulent claim or attempting to mislead Sirius?" value={data.application.responses.Questions[8]} />
      </dl>
    </div>
  </div>
</div>
