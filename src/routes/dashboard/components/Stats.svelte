<script lang="ts">
  import { page } from '$app/stores';
</script>

<div>
  <h3 class="text-lg font-medium leading-6 text-neutral-200">Application Stats</h3>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div class="w-full rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] bg-cover bg-center bg-no-repeat px-4 py-5 shadow sm:p-6" style="background-image: url('{$page.data.application.discord.User.banner}?size=1024'); background-color: {$page.data.application.discord.User.accent_color ? '#' + $page.data.application.discord.User.accent_color : '#050505'};">
      <dt class="hidden truncate text-sm font-medium text-neutral-400">Profile</dt>
      <dd class="mt-1 rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] bg-opacity-80 text-3xl font-semibold tracking-tight text-neutral-300">
        <div class="mx-4 my-2">
          <img src="{$page.data.application.discord.User.avatar}?size=1024" class="inline-block h-10 w-10 rounded-full" alt="User Avatar" />
          <br />
          {$page.data.application.discord.User.username + '#' + $page.data.application.discord.User.discriminator}
          <br />
          <p class="text-sm text-neutral-400">
            <span>Discord ID: {$page.data.application.discord.User.id}</span>
            <br />
            <span>Joined {new Date($page.data.application.discord.Guild.joined_at).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>
      </dd>
    </div>
    <div class="overflow-hidden rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-sm font-medium text-neutral-400">Status</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-neutral-300">
        {$page.data.parsedStatus}
        {#if $page.data.application.Reviewer}
          <p title={$page.data.application.Reviewer.id} class="text-sm text-neutral-400">by {$page.data.application.Reviewer.username} on {new Date($page.data.application.updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {/if}
      </dd>
    </div>

    <div class="overflow-hidden rounded-lg border-2 border-neutral-700 border-opacity-40 bg-[#050505] px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-sm font-medium text-neutral-400">Submitted</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-neutral-300 first-letter:uppercase">{new Date($page.data.application.createdAt).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
    </div>
  </dl>
</div>
