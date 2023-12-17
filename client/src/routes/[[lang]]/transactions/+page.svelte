<script>
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	const tabs = [
		{
			title: 'Soccer',
			image: '/imgs/live-sports/ball.svg'
		},
		{
			title: 'Esports',
			image: '/imgs/live-sports/headphone.svg'
		},
		{
			title: 'Tennis',
			image: '/imgs/live-sports/tennis-ball.svg'
		},
		{
			title: 'Basketball',
			image: '/imgs/live-sports/basket-ball.svg'
		},
	];
    let currentTab = 'soccer'
    function handleFilter(title) {
		currentTab = title.toLowerCase();
		// updateDynamicSportsItems();
	}
</script>

<main class="w-full py-[27px] pl-[15px] pr-[15px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main">
		<div class="flex items-center justify-between mb-[35px]">
			<h6 class="text-mxl gradient-text-white2 main font-semibold">Transactions</h6>
		</div>
		<div class="w-full">
			<div
				class="md:flex-wrap dragable overflow-auto scrollbar-hidden w-full flex items-center gap-[15px]"
			>
				{#each tabs as tab}
					<div on:click={() => handleFilter(tab.title)} class={`${
							currentTab.toLowerCase() === tab.title.toLowerCase() ? 'bg-linear active-p-white' : ''
						} ${
							tab.hide ? 'hidden sm:flex' : 'flex'
						} min-w-max group items-center gap-[8px] pl-[12px] pr-[8px] py-[9px] bg-black5 dark:bg-white5 border border-black5 dark:border-white11 rounded-[7px] cursor-pointer hover:bg-linear`}
					>
						<img class="translate-y-[1px] w-[15px] mb-[3px]" src={tab.image} alt={tab.title} />
						<p
							class="translate-y-[1px] group-hover:text-white text-black dark:text-white text-xs sm:text-sm font-normal"
						>
							{tab.title}
						</p>
                        <svg class="w-[16px] h-[16px] rotate-[180deg]">
                            <use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#chevron-left"/>
                        </svg>
					</div>
				{/each}
			</div>

            <div class="relative w-full mt-[25px]">
                <div class="w-full grid grid-cols-5 gap-[15px] bg-white dark:bg-white5 rounded-t-[14px] px-[28px] py-[20px] border-b border-grayLight3 dark:border-white11">
                    <p class="text-sm md:text-base font-medium text-black dark:text-white">{$LL.TYPE()}</p>
                    <p class="text-sm md:text-base font-medium text-black dark:text-white">{$LL.MERRCHANT_ID()}</p>
                    <p class="text-sm md:text-base font-medium text-black dark:text-white">{$LL.AMOUNT()}</p>
                    <p class="text-sm md:text-base font-medium text-black dark:text-white">{$LL.TIME()}</p>
                    <p class="text-sm md:text-base font-medium text-black dark:text-white">{$LL.STATUS()}</p>
                </div>
                <div class="w-full flex flex-col">
                    <div class="w-full grid grid-cols-5 gap-[15px] bg-transparent px-[28px] py-[25px] border-b border-grayLight3 dark:border-white11 hover:bg-grayLight2 dark:hover:bg-white11">
                        <p class="text-sm md:text-base text-grayDark font-medium">{$LL.DEPOSIT()}</p>
                        <p class="text-sm md:text-base text-black dark:text-white font-medium">BountryHunter31</p>
                        <div class="flex items-center gap-[4px]">
                            <p class="text-sm md:text-base text-black dark:text-white font-medium">104.54</p>
                            <img class="w-[24px]" src="/imgs/bitcoin.svg"/>
                        </div>
                        <p class="text-sm md:text-base text-grayDark font-medium">2023/13/07 22:33</p>
                        <div class="flex items-center px-[10px] py-[7px] gap-[6px]  max-w-max rounded-full bg-white dark:bg-white5">
                            <div class="w-[10px] h-[10px] bg-green rounded-full"></div>
                            <p class="text-sm md:text-base text-black dark:text-white font-medium">Completed</p>
                        </div>
                    </div>
                    <div class="w-full grid grid-cols-5 gap-[15px] bg-transparent px-[28px] py-[25px] border-b border-grayLight3 dark:border-white11 hover:bg-grayLight2 dark:hover:bg-white11">
                        <p class="text-sm md:text-base text-grayDark font-medium">{$LL.DEPOSIT()}</p>
                        <p class="text-sm md:text-base text-black dark:text-white font-medium">BountryHunter31</p>
                        <div class="flex items-center gap-[4px]">
                            <p class="text-sm md:text-base text-black dark:text-white font-medium">104.54</p>
                            <img class="w-[24px]" src="/imgs/bitcoin.svg"/>
                        </div>
                        <p class="text-sm md:text-base text-grayDark font-medium">2023/13/07 22:33</p>
                        <div class="flex items-center px-[10px] py-[7px] gap-[6px]  max-w-max rounded-full bg-white dark:bg-white5">
                            <div class="w-[10px] h-[10px] bg-red rounded-full"></div>
                            <p class="text-sm md:text-base text-black dark:text-white font-medium">Failed</p>
                        </div>
                    </div>
                </div>
            </div>

		</div>
	</div>
</main>
