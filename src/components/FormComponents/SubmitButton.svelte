<script>
  /**
   * @type {any}
   */
  export let text;
  export let disabled = false;
</script>

<button type="submit" {disabled} class="ml-3 inline-flex cursor-pointer justify-center rounded-md border border-neutral-800 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-500 hover:border-neutral-500 hover:bg-white hover:text-black focus:ring-transparent focus:ring-offset-0 active:scale-90">{text}</button>
