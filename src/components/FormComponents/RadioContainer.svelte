<script>
  export let title = 'Undefined';
  export let name = 'Undefined';
  export let size = 'medium';

  switch (size) {
    case 'short':
      size = 'col-span-6 sm:col-span-3';
      break;
    case 'medium':
      size = 'col-span-6 sm:col-span-4';
      break;
    case 'long':
      size = 'col-span-6 sm:col-span-6';
      break;
    default:
      size = 'col-span-6 sm:col-span-4';
  }
</script>

<fieldset class={size} {name}>
  <label for={name} class="block text-sm font-medium text-neutral-200">{title}</label>
  <div class="mt-1 space-y-1">
    <slot />
  </div>
</fieldset>
