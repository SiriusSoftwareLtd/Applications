<script>
  export let title = '';
  export let description = '';
</script>

<div class="rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] px-4 py-5 shadow sm:p-6">
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <h3 class="text-lg font-medium leading-6 text-neutral-200">{title}</h3>
      <p class="mt-1 text-sm text-neutral-400">{description}</p>
    </div>
    <div class="mt-5 md:col-span-2 md:mt-0">
      <div class="grid grid-cols-6 gap-6">
        <slot />
      </div>
    </div>
  </div>
</div>
