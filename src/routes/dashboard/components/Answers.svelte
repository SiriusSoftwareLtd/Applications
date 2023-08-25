<script lang="ts">
  export let title: string;
  export let value: string | undefined = undefined;
</script>

<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
  <dt class="text-sm font-medium text-neutral-300">{title}</dt>
  <!-- if value is non existent (undefined or null, dont show it) -->
  {#if value !== undefined && value !== null}
    <dd class="mt-1 text-sm text-neutral-300 sm:col-span-2 sm:mt-0">{value}</dd>
  {/if}
  <slot />
</div>
