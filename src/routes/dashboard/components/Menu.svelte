<script lang="ts">
  import { Transition } from '@rgossiaux/svelte-headlessui';
  export let isOpenMenu = false;
  let isOpen = false;
</script>

<div class="relative mt-1 block text-left">
  <div>
    <button
      type="button"
      on:contextmenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        isOpen = !isOpen;
      }}
      on:click={() => (isOpenMenu = !isOpenMenu)}
      class="inline-flex w-full justify-center rounded-md border-2 border-neutral-700 border-opacity-40 bg-[#050505] px-4 py-2 text-sm font-medium text-neutral-200 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
    >
      Options
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  <Transition show={isOpenMenu} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
    <div class="absolute right-0 z-10 mt-2 flex w-56 origin-top-right flex-col justify-center divide-y divide-neutral-800 rounded-md bg-[#050505] shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="flex flex-col justify-center py-1" role="none">
        <form action="?/acceptApplication" method="POST" class="mx-1 flex">
          <button
            on:contextmenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isOpen = !isOpen;
            }}
            type="submit"
            class="group mx-1 flex w-full items-center rounded px-4 py-2 text-sm text-neutral-400 transition-colors duration-500 hover:bg-neutral-900 hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="menu-item-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5 text-neutral-400 transition-colors duration-500 group-hover:text-green-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>

            Accept
          </button>
        </form>
        <form action="?/rejectApplication" method="POST" class="mx-1 flex">
          <button
            on:contextmenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isOpen = !isOpen;
            }}
            type="submit"
            class="group mx-1 mt-1 flex w-full items-center rounded px-4 py-2 text-sm text-neutral-400 transition-colors duration-500 hover:bg-neutral-900 hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="menu-item-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5 text-neutral-400 transition-colors duration-500 group-hover:text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Deny
          </button>
        </form>
      </div>
      <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <div class="flex flex-col justify-center py-1" role="none">
          <form action="?/deleteApplication" method="POST" class="mx-1 flex">
            <button
              on:contextmenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              type="submit"
              class="group mx-1 flex w-full items-center rounded px-4 py-2 text-sm text-neutral-400 transition-colors duration-500 hover:bg-red-900 hover:text-white hover:text-opacity-60"
              role="menuitem"
              tabindex="-1"
              id="menu-item-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5 text-neutral-400 transition-colors duration-500 group-hover:text-white group-hover:text-opacity-60">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Delete
            </button>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</div>
