<script lang="ts">
  export let label = 'Undefined';
  export let placeholder = ' ';
  export let name = 'Undefined';
  export let size = 'medium';
  export let constraints:
    | Partial<{
        pattern: string;
        min: string | number;
        max: string | number;
        required: boolean;
        step: number;
        minlength: number;
        maxlength: number;
      }>
    | undefined;

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

<div class={size}>
  <label for={name} class="block text-sm font-medium text-neutral-200">{label}</label>
  <div class="mt-1">
    <textarea required {placeholder} {...constraints} rows="4" {name} id={name} class=" mt-1 block max-h-56 min-h-[98px] w-full resize-y rounded-md border-neutral-800 bg-black text-white placeholder-white placeholder-opacity-40 shadow-sm hover:border-neutral-500 focus:border-neutral-500 focus:ring-transparent sm:text-sm" />
  </div>
</div>

<style>
  textarea:not(:focus):not(:placeholder-shown):invalid,
  textarea:not(:placeholder-shown):invalid {
    --tw-border-opacity: 1;
    border-color: rgb(153 27 27 / var(--tw-border-opacity));
  }
</style>
