<script lang="ts">
  import { Transition } from '@rgossiaux/svelte-headlessui';
  import { page } from '$app/stores';
  export let isOpen = false;
</script>

<div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <div class="relative mt-1">
    <button type="button" on:click={() => (isOpen = !isOpen)} class="relative w-full cursor-pointer rounded-md border-2 border-neutral-700 border-opacity-40 bg-[#050505] py-2 pl-3 pr-10 text-left shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      <span class="flex items-center text-neutral-200">
        {#if $page.params.applicationID}
          {#if $page.data.application.status === 0}
            <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
          {:else if $page.data.application.status === 1}
            <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" />
          {:else if $page.data.application.status === 2}
            <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
          {/if}
          <span class="ml-3 block truncate">{$page.data.application.discord.User.username}#{$page.data.application.discord.User.discriminator}</span>
        {:else}
          <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-transparent" />
          <span class="ml-3 block truncate">Select Application</span>
        {/if}
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#050505] py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox">
        <!-- svelte-ignore a11y-role-has-required-aria-props -->
        <!-- svelte-ignore a11y-role-has-required-aria-props -->
        {#await $page.data.streamed.applications}
          <li class="relative mx-1 my-1 animate-pulse cursor-pointer select-none rounded bg-neutral-900 py-2 pl-3 pr-9 text-white transition-colors duration-500" role="option">
            <div class="flex items-center">
              <span class="ml-3 block truncate font-normal"> Loading Applications... </span>
            </div>
          </li>
        {:then applications}
          {#if applications.length > 0}
            {#each applications as application}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <li>
                <a href="/dashboard/{application._id}" class=" relative mx-1 my-1 list-item cursor-pointer select-none rounded py-2 pl-3 pr-9 text-neutral-200 transition-colors duration-500 hover:bg-neutral-900 hover:text-white" id="listbox-option-{application.id}" role="option">
                  <div class="flex items-center">
                    {#if application.status === 0}
                      <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                    {:else if application.status === 1}
                      <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                    {:else if application.status === 2}
                      <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                    {/if}
                    <span class="ml-3 block truncate font-normal">
                      {application.discord.User.username}#{application.discord.User.discriminator}
                    </span>
                  </div>

                  {#if $page.data.application && application._id === $page.data.application._id}
                    <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                      <!-- Heroicon name: mini/check -->
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  {/if}
                </a>
              </li>
            {/each}
          {:else}
            <div class="p-2">
              <p class="text-center italic text-neutral-500">No applications found!</p>
            </div>
          {/if}
        {/await}
      </ul>
    </Transition>
  </div>
</div>
