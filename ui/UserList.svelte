<script>
    import { onMount } from "svelte";
    import { send, subscribe } from "./commands.ts";

    let users = $state([]);
    let filter = $state("");
    let filtered = $derived(
        users.filter((user) =>
            user.name.toLowerCase().includes(filter.toLowerCase()),
        ),
    );

    onMount(() => send("get-userlist"));
    subscribe("set-userlist", (value) => {
        users = value;
    });
</script>

<input type="text" bind:value={filter} />
<section id="users">
    {#each filtered as { name, status }}
        <button class={status} onclick={() => send("click-user", name)}>
            {name}
        </button>
    {/each}
</section>

<style>
    input {
        width: 100%;
    }
    section {
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    button {
        display: block;
        justify-self: center;
        border: 0;
        background: 0;
        cursor: pointer;
    }
    button:hover {
        background-color: #222;
    }
    button.online {
        color: lime;
    }
    button.pro {
        color: blue;
    }
    button.offline {
        color: red;
    }
    button.blockStatusIcon {
        text-decoration: line-through;
    }
</style>
