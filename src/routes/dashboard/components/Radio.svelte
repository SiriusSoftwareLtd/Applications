<script lang="ts">
  export let description = 'Undefined';
  export let name = 'Undefined';
  export let value = 'Undefined';
  export let id = 'Undefined';
  export let checked = false;
  export let rightAnswer = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative flex items-start">
  <div class="flex h-5 items-center">
    <input {id} {checked} {value} {name} disabled type="radio" class="h-4 w-4 border-neutral-800 bg-black text-white checked:border-white checked:bg-white focus:border-neutral-500 focus:ring-transparent focus:ring-offset-0" />
  </div>
  <div class="ml-3 text-sm">
    <label for={id} class={rightAnswer === true ? 'font-bold text-neutral-300' : 'text-neutral-400'}><p>{description}</p></label>
  </div>
</div>
