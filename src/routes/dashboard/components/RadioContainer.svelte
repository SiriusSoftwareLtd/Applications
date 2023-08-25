<script>
  export let title = 'Undefined';
  export let name = 'Undefined';
</script>

<fieldset {name}>
  <label for={name} class="block text-sm font-medium text-neutral-200">{title}</label>
  <div class="mt-1 space-y-1">
    <slot />
  </div>
</fieldset>
