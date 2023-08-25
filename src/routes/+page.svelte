<script lang="ts">
  // Imports
  import { superForm } from 'sveltekit-superforms/client';
  // local imports
  import type { PageData } from './$types';
  import FormQuestionContainer from '../components/FormComponents/FormQuestionContainer.svelte';
  import Input from '../components/FormComponents/Input.svelte';
  import TextArea from '../components/FormComponents/TextArea.svelte';
  import RadioContainer from '../components/FormComponents/RadioContainer.svelte';
  import Radio from '../components/FormComponents/Radio.svelte';
  import CheckboxContainer from '../components/FormComponents/CheckboxContainer.svelte';
  import Checkbox from '../components/FormComponents/Checkbox.svelte';
  import SubmitButton from '../components/FormComponents/SubmitButton.svelte';
  import Navbar from '../components/Navbar.svelte';
  import { page } from '$app/stores';

  let submitButtonDisabled = false;
  let submitButtonText = 'Submit';

  // Exports
  export let data: PageData;

  export const { form, enhance, constraints, errors } = superForm($page.form, {
    taintedMessage: 'Are you sure you want to leave?',
    multipleSubmits: 'prevent',
    validators: {
      name: (value) => (value.length >= 2 ? 'Name must be at least 2 characters long' : null),
      siriusDiscovery: (value) => (value.length >= 1 ? 'Sirius Discovery must be at least 1 characters long' : null),
      spareTime: (value) => (value.length >= 1 ? 'Spare time must be at least 1 characters long' : null),
      question1: (value) => (value.length >= 1 ? 'Question 1 must be at least 1 characters long' : null),
      question2: (value) => (value.length >= 1 ? 'Question 2 must be at least 1 characters long' : null),
      question3: (value) => (value.length >= 1 ? 'Question 3 must be at least 1 characters long' : null),
      question4: (value) => (value.length >= 1 ? 'Question 4 must be at least 1 characters long' : null),
      question5: (value) => (value.length >= 1 ? 'Question 5 must be at least 1 characters long' : null),
      question6: (value) => (value.length >= 1 ? 'Question 6 must be at least 1 characters long' : null),
      question7: (value) => (value.length >= 1 ? 'Question 7 must be at least 1 characters long' : null),
      question8: (value) => (value.length >= 1 ? 'Question 8 must be at least 1 characters long' : null),
      question9: (value) => (value.length >= 1 ? 'Question 9 must be at least 1 characters long' : null),
      contactStaff: (value) => (value.length >= 1 ? 'Contact Staff must be at least 1 characters long' : null),
      contactInfo: (value) => (value.length >= 1 ? 'Contact Info must be at least 1 characters long' : null),
      data: (value) => (value.length >= 1 ? 'Data must be at least 1 characters long' : null)
    },
    onSubmit: () => {
      submitButtonDisabled = true;
      submitButtonText = 'Submitting...';
    },
    onResult: ({ result, formEl, cancel }) => {
      if (result.type === 'success') {
        submitButtonText = 'Submitted!';
        submitButtonDisabled = true;
        setTimeout(() => {
          submitButtonText = 'Submit';
          submitButtonDisabled = false;
        }, 2000);
        formEl.reset();
      } else {
        // @ts-expect-error because it has weird params
        submitButtonText = result.data.message;
        submitButtonDisabled = true;
        setTimeout(() => {
          submitButtonText = 'Submit';
          submitButtonDisabled = false;
        }, 2000);
        cancel();
      }
    },
    onError: ({ result, message }) => {
      console.log('onError', result, message);
      submitButtonText = 'Error! Please try again.';
      submitButtonDisabled = true;
      setTimeout(() => {
        submitButtonText = 'Submit';
        submitButtonDisabled = false;
      }, 2000);
    }
  });
</script>

<Navbar />

{#if data.user}
  <div class="px-4 pt-8 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-72">
    <h3 class="text-lg font-medium leading-6 text-neutral-200">Applying as</h3>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="group w-full rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] bg-cover bg-center bg-no-repeat px-4 py-5 shadow sm:p-6" style="background-image: url('{data.user?.discord.User.banner}?size=1024'); background-color: {data.user?.discord.User.accent_color ? '#' + data.user?.discord.User.accent_color : '#050505'};">
        <dt class="hidden truncate text-sm font-medium text-neutral-400">Profile</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-neutral-300">
          <img src="{data.user?.discord.User.avatar}?size=1024" class="inline-block h-10 w-10 rounded-full" alt="User Avatar" />
          <br />
          {data.user?.discord.User.username + '#' + data.user?.discord.User.discriminator}
          <br />
          <span class="text-sm font-normal text-neutral-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Not you? <a href="/logout" class="underline">Logout</a></span>
        </dd>
      </div>
    </dl>
  </div>

  <form method="post" id="form" use:enhance>
    <div id="#FormQuestions" class="flex flex-col flex-wrap space-y-6 px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-72">
      <FormQuestionContainer title="Introductory Questions" description="Before we begin, we'd like to get to know you, as a person, before getting to know about your skills and what you can bring to the team.">
        <Input label="What should we call you?" placeholder="Craig" name="name" type="text" contraints={$constraints.name} />
        <Input label="Where did you hear about Sirius?" placeholder="From a friend" name="siriusDiscovery" type="text" contraints={$constraints.siriusDiscovery} />
        <Input label="What do you like to do, in your spare time?" placeholder="Help other people" name="spareTime" type="text" contraints={$constraints.spareTime} />
      </FormQuestionContainer>

      <FormQuestionContainer title="Multiple-Choice Questions" description="For the following questions, choose the best, and most appropriate answer in your opinion so we can assess your knowledge of customer service">
        <RadioContainer title="Which of the following is the most appropriate response if a user is engaging in inappropriate behavior in the server?" name="question1">
          <Radio description="Threaten to punish the user immediately" value="1" name="question1" id="question1-1" />
          <Radio description="Report the user to a higher-up" value="2" name="question1" id="question1-2" />
          <Radio description="Confront the user and tell them to stop" value="3" name="question1" id="question1-3" />
          <Radio description="Ignore the behavior and hope it goes away" value="4" name="question1" id="question1-4" />
        </RadioContainer>

        <RadioContainer title="Which of the following is the most effective way to communicate with a user who has a technical issue?" name="question2">
          <Radio description="Use technical jargon to show off your expertise" value="1" name="question2" id="question2-1" />
          <Radio description="Speak slowly and use simple language to explain the issue" value="2" name="question2" id="question2-2" />
          <Radio description="Ignore the user's technical concerns and focus on resolving the issue" value="3" name="question2" id="question2-3" />
          <Radio description="Offer to remote into the user's device to fix the issue yourself" value="4" name="question2" id="question2-4" />
        </RadioContainer>

        <RadioContainer title="A user is experiencing a technical issue with their device that is beyond your expertise. What should you do?" name="question3">
          <Radio description="Tell them to figure it out on their own" value="1" name="question3" id="question3-1" />
          <Radio description="Ask a developer, or a more experienced support member for help" value="2" name="question3" id="question3-2" />
          <Radio description="Tell them it works for you, so it's not your problem" value="3" name="question3" id="question3-3" />
          <Radio description="Ignore their issue and move on to another ticket" value="4" name="question3" id="question3-4" />
        </RadioContainer>
      </FormQuestionContainer>
      <FormQuestionContainer title="Formal Questions" description="Now, we'd like to see how you'd fit into our team of support and staff, and if you're capable of keeping high standards while being friendly.">
        <TextArea label="What inspired you to apply for the role of a support member, and what do you believe you can bring to the team?" name="question4" constraints={$constraints.question4} />
        <TextArea label="What customer service experience do you have, and how do you handle difficult customers or situations?" name="question5" constraints={$constraints.question5} />
        <TextArea label="Have you ever encountered a technical issue that you didn't know how to solve? If so, how did you go about finding a solution?" name="question6" constraints={$constraints.question6} />
        <TextArea label="How would you handle a situation where a user is upset or frustrated about their experience with Sirius?" name="question7" constraints={$constraints.question7} />
        <TextArea label="What do you believe is the most important quality for a support member to possess, and why?" name="question8" constraints={$constraints.question8} />
        <TextArea label="How would you handle a situation where a user is making a fraudulent claim or attempting to mislead Sirius?" name="question9" constraints={$constraints.question9} />
      </FormQuestionContainer>

      <div class="flex items-start justify-between">
        <CheckboxContainer>
          <Checkbox title="Contacting" description="I agree that I will not contact any staff member about when the application will be reviewed or the reason for its denial." name="contactStaff" />
          <Checkbox title="Information" description="I agree that all the information I get about the final outcome will be stated in the DM I receive from the bot, and I won't contact anyone about or talk about it on the server to get further information." name="contactInfo" />
          <Checkbox title="Data" description="I acknowledge that after submitting this form, my discord data and all the information I provided above will be stored in a database." name="data" />
        </CheckboxContainer>

        <div class="flex flex-1 flex-shrink flex-grow-0 justify-end">
          <SubmitButton text={submitButtonText} disabled={submitButtonDisabled} />
        </div>
      </div>
    </div>
  </form>
{:else}
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-neutral-200 sm:text-5xl">Not logged in</h1>
      <p class="mt-6 text-base leading-7 text-neutral-400">You must log in first to access the form</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="/login" class="text-sm font-semibold text-neutral-500">Login <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </main>
{/if}
