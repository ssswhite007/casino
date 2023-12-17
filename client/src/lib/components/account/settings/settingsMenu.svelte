<script>
	import { createEventDispatcher, onMount } from "svelte";

    export let activeTab;
    let tab = activeTab

    const dispatchEvent = createEventDispatcher()
    function handleTab(target) {
        tab = target
        dispatchEvent('handleTab', tab)
    }
</script>
<div class="sticky w-full">
    <ul class="flex flex-col gap-[5px]">
        <li>
            <a href="#" on:click={() => handleTab('general')} class={`${tab === 'general' ? 'bg-white dark:bg-white5 border-grayLight2 dark:border-white11 text-purpleLight' : 'border-transparent text-black dark:text-white'} active:scale-[0.95] transition-all flex px-[18px] py-[13px] border hover:bg-white dark:hover:bg-white5  hover:border-grayLight2 dark:hover:border-white11 rounded-[7px] `}>General</a>
        </li>
        <li>
            <a href="#" on:click={() => handleTab('privacy')} class={`${tab === 'privacy' ? 'bg-white dark:bg-white5 border-grayLight2 dark:border-white11 text-purpleLight' : 'border-transparent text-black dark:text-white'} active:scale-[0.95] transition-all flex px-[18px] py-[13px] border hover:bg-white dark:hover:bg-white5  hover:border-grayLight2 dark:hover:border-white11 rounded-[7px] `}>Privacy</a>
        </li>
        <li>
            <a href="#" on:click={() => handleTab('security')}  class={`${tab === 'security' ? 'bg-white dark:bg-white5 border-grayLight2 dark:border-white11 text-purpleLight' : 'border-transparent text-black dark:text-white'} active:scale-[0.95] transition-all flex px-[18px] py-[13px] border hover:bg-white dark:hover:bg-white5  hover:border-grayLight2 dark:hover:border-white11 rounded-[7px] `}>Security</a>
        </li>
    </ul>
</div>