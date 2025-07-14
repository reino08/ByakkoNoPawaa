<script>
  import Macros from "./Macros.svelte";
  import Toggles from "./Toggles.svelte";
  import UserList from "./UserList.svelte";
</script>

<h1>白狐のパワー</h1>
<Toggles />
<Macros />
<hr />
<UserList />

<style>
  h1 {
    position: relative;
    color: red;
  }

  h1::after {
    content: "白狐のパワー";
    position: absolute;
    top: 2px;
    left: 2px;
    text-wrap: nowrap;
    color: white;
  }

  hr {
    width: 90%;
  }
</style>
