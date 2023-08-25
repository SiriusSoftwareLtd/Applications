<script lang="ts">
  export let description = 'Undefined';
  export let name = 'Undefined';
  export let value = 'Undefined';
  export let id = 'Undefined';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative flex items-start">
  <div class="flex h-5 items-center">
    <input {id} {value} {name} required type="radio" class="h-4 w-4 border-neutral-800 bg-black text-white checked:border-white checked:bg-white hover:border-neutral-500 focus:border-neutral-500 focus:ring-transparent focus:ring-offset-0" />
  </div>
  <div class="ml-3 text-sm">
    <label for={id} class="text-neutral-400"><p>{description}</p></label>
  </div>
</div>
