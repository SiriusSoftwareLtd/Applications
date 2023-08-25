<script lang="ts">
  import Navbar from '../../components/Navbar.svelte';
</script>

<Navbar />

<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-neutral-400">403</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-neutral-200 sm:text-5xl">Unauthorized</h1>
    <p class="mt-6 text-base leading-7 text-neutral-400">You are not authorized to access that page.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="/" class="text-sm font-semibold text-neutral-500">Go home <span aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
</main>
