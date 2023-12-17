<script>
    import SettingsMenu from '$lib/components/account/settings/settingsMenu.svelte'
    import SettingsLayout from '$lib/components/account/settings/layout/settingsLayout.svelte'
    import GeneralTab from '$lib/components/account/settings/tabs/generalTab.svelte'
    import PrivacyTab from '$lib/components/account/settings/tabs/privacyTab.svelte'
	import SecurityTab from '@components/account/settings/tabs/securityTab.svelte';
    import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";
    
    let tab = 'general'
    function handleTab(activeTab) {
        tab = activeTab.detail
    }
</script>
<main class="w-full py-[27px] pl-[15px] pr-[15px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main">
        <div class="flex items-center justify-between mb-[35px]">
            <h6 class="text-mxl gradient-text-white2 main font-semibold">{$LL.GLOBAL_SETTINGS()}</h6>
        	<a href="/" class="flex items-center opacity-70 hover:opacity-100 bg-white dark:bg-white5 px-[25px] py-[12px] rounded-[7px]">
                <svg class="w-[20px] h-[20px]">
                    <use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#chevron-left"/>
                </svg>
				<p class="text-sm font-medium capitalize text-black dark:text-white">{$LL.BACK()}</p>
			</a>
        </div>
        <div class="w-full grid md:grid-cols-[190px,auto] gap-[30px]">
            <SettingsMenu activeTab={tab} on:handleTab={handleTab}/>
            <SettingsLayout>
               {#if tab === 'general'}
               <GeneralTab /> 
               {/if}
               {#if tab === 'privacy'}
                <PrivacyTab />
               {/if}
               {#if tab === 'security'}
               <SecurityTab />
               {/if}
            </SettingsLayout>
        </div>
    </div>
</main>
