<script>
  import { send } from "./commands.ts";

  let actions = [
    ["Draw random", "randomDraw"],
    ["Spam text", "spamText"],
  ];
</script>

{#each actions as [display, id]}
  <button
    on:mousedown={() => send("macro", id, true)}
    on:mouseup={() => send("macro", id, false)}
  >
    {display}
  </button>
{/each}
