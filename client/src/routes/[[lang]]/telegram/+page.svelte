<script>
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import globalStore from "@store/globalStore";

  /** @type {import('./$types').PageData} */
  export let data;

  
  $: if (data && browser) {
    globalStore.toggleItem('telegramUserData', data);
    goto("/");
  }
</script>
