<script>
	import SettingsLayout from '$lib/components/account/settings/layout/settingsLayout.svelte';
	import HelpCenterMenu from '@components/help-center/helpCenterMenu.svelte';
	import ProvablyFairs from '@components/help-center/tabs/provablyFairs.svelte';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	let tab = '';
    let selectedIndex = 2;
	function handleTab(activeTab) {
		tab = activeTab.detail;
	}
	function handleChange(label) {
		tab = label.detail
	}
</script>

<main class="w-full py-[27px] pl-[15px] pr-[15px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main">
		<div class="flex items-center justify-between mb-[35px]">
			<h6 class="text-mxl gradient-text-white2 main font-semibold">{$LL.HELP_CENTER()}</h6>
			<a
				href="/"
				class="flex items-center opacity-70 hover:opacity-100 bg-white dark:bg-white5 px-[25px] py-[12px] rounded-[7px]"
			>
				<svg class="w-[20px] h-[20px]">
					<use
						class="fill-black dark:fill-white"
						href="/imgs/icons/icons.svg#chevron-left"
					/>
				</svg>
				<p class="text-sm font-medium capitalize text-black dark:text-white"> {tab} {$LL.BACK()}</p>
			</a>
		</div>
		<div class="w-full grid md:grid-cols-[200px,auto] items-start gap-[30px]">
			<HelpCenterMenu activeTab={tab} selectedIndex={selectedIndex} on:handleTab={handleTab} on:handleChange={handleChange} />
			<SettingsLayout>
				{#if tab === 'provably fair'}
					<ProvablyFairs />
				{/if}
			</SettingsLayout>
		</div>
	</div>
</main>
