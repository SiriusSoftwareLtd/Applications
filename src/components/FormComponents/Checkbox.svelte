<script>
  export let name = 'Undefined';
  export let title = 'Undefined';
  export let description = 'Undefined';
</script>

<div class="relative flex items-start">
  <div class="flex h-5 items-center">
    <input id={name} aria-describedby={name + '-description'} {name} required type="checkbox" class="h-4 w-4 rounded border-neutral-800 bg-black text-white checked:border-white checked:bg-white hover:border-neutral-500 focus:border-neutral-500 focus:ring-transparent focus:ring-offset-0" />
  </div>
  <div class="ml-3 text-sm">
    <label for={name} class="font-medium text-neutral-200">{title}</label>
    <br />
    <label for={name} id={name + '-description'} class="text-neutral-400"><p>{description}</p></label>
  </div>
</div>
