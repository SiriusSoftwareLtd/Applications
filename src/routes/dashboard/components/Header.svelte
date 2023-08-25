<script lang="ts">
  import { page } from '$app/stores';
  import { Transition } from '@rgossiaux/svelte-headlessui';
  import SelectMenu from './SelectMenu.svelte';
  import Menu from './Menu.svelte';
  let isOpen = false;
  let isOpenMenu = false;
  let open = false;
</script>

<header
  on:mouseleave={() => {
    open = false;
    isOpen = false;
    isOpenMenu = false;
  }}
  class="sticky top-0 z-10 border-b-2 border-b-neutral-700 border-opacity-40 bg-[#050505]"
>
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-neutral-700 lg:px-8">
    <div class="relative flex h-16 justify-between">
      <div class="relative z-10 flex px-2 lg:px-0">
        <div class="flex flex-shrink-0 items-center">
          <a href="/dashboard">
            <img class="block h-8 w-auto" src="/assets/images/logo.svg" alt="Sirius" />
          </a>
        </div>
      </div>

      <div class="relative z-0 flex flex-1 items-center justify-center gap-4 px-2 sm:absolute sm:inset-0">
        <div class="w-full sm:max-w-xs">
          <SelectMenu bind:isOpen={open} />
        </div>
        {#if $page.params.applicationID && $page.data.user.reviewer}
          <Menu bind:isOpenMenu />
        {/if}
      </div>
      <div class="relative z-10 flex items-center lg:hidden">
        <!-- Mobile menu button -->
        <button on:click={() => (isOpen = !isOpen)} type="button" class="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open menu</span>
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => (isOpen = !isOpen)} class="cursor-pointer">
          <p class="text-neutral-300">{$page.data.user.discord.User.username}</p>
        </div>
        <!-- Profile dropdown -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={() => (isOpen = !isOpen)} class="relative flex-shrink-0 cursor-pointer pl-4">
          <div>
            <button
              on:click={(e) => {
                e.preventDefault();
              }}
              type="button"
              class="flex rounded-full bg-neutral-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 focus:ring-offset-neutral-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <img class="pointer-events-none h-8 w-8 rounded-full" src={$page.data.user.discord.User.avatar} alt="User" />
            </button>
          </div>

          <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <div class="absolute right-0 z-10 mx-1 my-1 mt-2 flex w-48 origin-top-right justify-center rounded-md border-2 border-neutral-700 border-opacity-40 bg-[#050505] py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <form action="/logout" method="POST" class="flex basis-full">
                <button type="submit" class="mx-1 block w-full rounded px-3 py-2 text-left text-sm text-neutral-200 transition-colors duration-500 hover:bg-neutral-900" tabindex="-1" id="user-menu-item-2">Sign out</button>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <nav class="lg:hidden" aria-label="Global" id="mobile-menu">
    <Transition show={isOpen} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
      <div class="border-t border-neutral-700 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="pointer-events-none h-10 w-10 rounded-full" src={$page.data.user.discord.User.avatar} alt="User" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{$page.data.user.discord.User.username}</div>
          </div>
        </div>

        <div class="mt-3 space-y-1 px-2">
          <form action="/logout" method="POST">
            <button class="block rounded-md px-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-700 hover:text-white">Sign out</button>
          </form>
        </div>
      </div>
    </Transition>
  </nav>
</header>
