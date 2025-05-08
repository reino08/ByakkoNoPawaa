<script>
  import { config } from "./index.ts";
  import { send } from "./commands.ts";
</script>

{#each Object.entries(config) as [key, value]}
  <div>
    {#if typeof value == "number"}
      <label for={key}>{key}</label>
      <input
        type="number"
        name={key}
        bind:value
        onchange={(e) => send("set", key, parseInt(e.target.value))}
      />
    {:else if typeof value == "boolean"}
      <label for={key}>{key}</label>
      <input
        type="checkbox"
        name={key}
        bind:checked={value}
        onchange={(e) => send("set", key, e.target.checked)}
      />
    {/if}
  </div>
{/each}
