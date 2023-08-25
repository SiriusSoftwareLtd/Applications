<script lang="ts">
  import type { PageData } from './$types';
  import { ApplicationStatus } from '$lib/types/application';
  import Header from './components/Header.svelte';
  export let data: PageData;

  let clickCount = 0;
  let text = 'Delete All Applications';

  function handleClick() {
    clickCount++;
    const button = document.getElementById('delete-all-button') as HTMLButtonElement;
    // initial styling of the button: absolute, left: 50% translateX: -50%
    if (clickCount === 1) {
      text = 'Are you sure?';
      // translate the button to left
      button.style.left = '0';
      button.style.transform = 'translateX(150%)';
    } else if (clickCount === 2) {
      text = 'This is your last chance!';
      // translate the button to right
      button.style.left = '50%';
    } else if (clickCount === 3) {
      // reset the button to initial styling
      button.style.left = '50%';
      button.style.transform = 'translateX(-50%)';
      text = 'Deleting...';
      // Submit the form
      const form = document.getElementById('delete-all-form') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }
  }
</script>

<Header />
<div class="mx-auto max-w-[90rem] space-y-6 px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-72">
  <div class="overflow-hidden border-2 border-neutral-700 border-opacity-40 p-4 shadow sm:rounded-md">
    {#await data.streamed.applications}
      <p class="text-white">Loading...</p>
    {:then applications}
      {#if applications.length > 0}
        <ul class="divide-y-8 divide-transparent">
          {#each applications as application}
            <li>
              <a href="/dashboard/{application._id}" class="block border-2 border-neutral-700 border-opacity-40 bg-[#050505] shadow transition-colors duration-300 hover:bg-neutral-800 sm:rounded-md">
                <div class="flex items-center">
                  <img src={application.discord.User.avatar} alt="User Avatar" class="pointer-events-none ml-4 h-16 rounded-full" />

                  <div class="flex-grow px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="truncate text-sm font-medium text-neutral-200">{application.name}</p>
                      <div class="ml-2 flex flex-shrink-0">
                        {#if application.status == ApplicationStatus.ACCEPTED}
                          <p class="inline-flex rounded-full bg-green-300 px-2 text-xs font-semibold leading-5 text-green-900">Accepted</p>
                        {:else if application.status == ApplicationStatus.DENIED}
                          <p class="inline-flex rounded-full bg-red-300 px-2 text-xs font-semibold leading-5 text-red-900">Denied</p>
                        {:else}
                          <p class="inline-flex rounded-full bg-yellow-300 px-2 text-xs font-semibold leading-5 text-yellow-900">Pending</p>
                        {/if}
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="mt-2 flex items-center text-sm text-neutral-400 sm:mt-0">
                          {application.discord.User.id}
                        </p>
                        <p class="mt-2 flex items-center text-sm text-neutral-400 sm:ml-4 sm:mt-0">
                          {application.discord.User.username}#{application.discord.User.discriminator}
                        </p>
                      </div>
                      <div class="mt-2 flex items-center text-sm text-neutral-400 sm:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-500">
                          <path
                            d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
                          />
                          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                        </svg>
                        <p>
                          Submitted on
                          <time datetime={application.createdAt.toISOString()}>{application.createdAt.toDateString()}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-center italic text-neutral-500">No applications found!</p>
      {/if}
    {/await}
  </div>
  {#if data.user?.reviewer}
    <form id="delete-all-form" action="?/deleteAllApplications" method="POST">
      <button id="delete-all-button" on:click={handleClick} type="button" class="absolute left-1/2 ml-3 inline-flex -translate-x-1/2 cursor-pointer justify-center rounded-md border border-neutral-800 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-500 hover:border-neutral-500 hover:bg-white hover:text-black focus:ring-transparent focus:ring-offset-0 active:scale-90">{text}</button>
    </form>
  {/if}
</div>
