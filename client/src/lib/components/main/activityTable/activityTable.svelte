<script>
	import { onMount } from 'svelte';
	import { getBetResult } from '@apis/casino';

	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	export let title;
	export let showCols;

	let latestBet = [];
	let recentDeposit = [];
	let recentWithdraw = [];
	let dynamicTableArr = latestBet;
	let activeFilter = 1;
	let loadCnt = 5;

	onMount(async () => {
		const res1 = await getBetResult();
		latestBet = res1.betHistoryResult.slice(0, loadCnt);
		dynamicTableArr = latestBet;

		const container = document.querySelectorAll('.dragable');
		container.forEach((cont) => {
			let startY;
			let startX;
			let scrollLeft;
			let scrollTop;
			let isDown;

			cont.addEventListener('mousedown', (e) => {
				isDown = true;
				startY = e.pageY - cont.offsetTop;
				startX = e.pageX - cont.offsetLeft;
				scrollLeft = cont.scrollLeft;
				scrollTop = cont.scrollTop;
			});
			cont.addEventListener('mouseup', (e) => {
				isDown = false;
			});
			cont.addEventListener('mouseleave', (e) => {
				isDown = false;
			});
			cont.addEventListener('mousemove', (e) => {
				if (isDown) {
					e.preventDefault();

					//Move Horizontally
					const x = e.pageX - cont.offsetLeft;
					const walkX = x - startX;
					cont.scrollLeft = scrollLeft - walkX;
				}
			});
		});
	});
	function handleFilter(filter) {
		activeFilter = filter;
		switch (filter) {
			case 1:
				dynamicTableArr = latestBet;
				break;
			case 2:
				dynamicTableArr = recentDeposit;
				break;
			case 3:
				dynamicTableArr = recentWithdraw;
				break;
			default:
				dynamicTableArr = latestBet;
				break;
		}
	}
</script>

<div class="w-full flex flex-col items-start gap-[15px] mt-[37px]">
	<div class="w-full flex items-center justify-between">
		<h6 class="font-semibold text-xl gradient-text-white2 main">
			{title}
		</h6>
	</div>

	<div class="relative w-full">
		<ul
			class="flex md:flex-wrap md:justify-start justify-between items-center gap-[12px] sm:gap-[40px] mt-[12px] sm:mt-[20px]"
		>
			<li
				on:click={() => handleFilter(1)}
				class={`${
					activeFilter == 1 ? 'active' : ''
				} gradient-text text-[10px] sm:text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				{$LL.LATEST_BETS()}
			</li>
			<li
				on:click={() => handleFilter(2)}
				class={`${activeFilter == 2 ? 'active' : ''} ${
					!showCols[1] ? 'hidden' : ''
				} gradient-text text-[10px] sm:text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				{$LL.RECENT_DEPOSITS()}
			</li>
			<li
				on:click={() => handleFilter(3)}
				class={`${activeFilter == 3 ? 'active' : ''} ${
					!showCols[2] ? 'hidden' : ''
				} gradient-text text-[10px] sm:text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				{$LL.RECENT_WITHDRAWALS()}
			</li>
		</ul>
	</div>

	<div
		class="w-full mt-[20px] flex flex-col cursor-dragable overflow-auto dragable overflow-auto scrollbar-hidden"
	>
		<div
			class="w-full min-w-[755px] gap-[15px] grid grid-cols-5 rounded-[14px] bg-grayLight2 dark:bg-black21 px-[28px] py-[20px]"
		>
			<p class="text-msm md:text-sm lg:text-base font-medium text-black dark:text-white">{$LL.GAME()}</p>
			<p class="text-msm md:text-sm lg:text-base font-medium text-black dark:text-white">{$LL.PLAYER()}</p>
			<p class="text-msm md:text-sm lg:text-base font-medium text-black dark:text-white">
				{$LL.BET_AMOUNT()}
			</p>
			<p class="text-msm md:text-sm lg:text-base font-medium text-black dark:text-white">
				{$LL.MULTIPLIER()}
			</p>
			<p class="text-end text-msm md:text-sm lg:text-base font-medium text-black dark:text-white">
				{$LL.PROFIT_AMOUNT()}
			</p>
		</div>
		<div class="w-full flex flex-col px-[28px]">
			{#each dynamicTableArr as item}
				<div
					class="min-w-[700px] gap-[15px] relative w-full grid grid-cols-5 py-[23px] before:content-[''] before:absolute before:top-full before:left-[50%] before:translate-x-[-50%] before:w-[97%] before:h-[1px] before:bg-grayLight dark:before:bg-blackDark2"
				>
					<div class="flex items-center gap-[5px] md:gap-[10px]">
						<img class="w-[15px] md:w-[19px]" src="/imgs/game1.svg" alt={item.title} />
						<p class="text-sm lg:text-base font-semibold text-grayDark dark:text-grayDark2">
							{item.title}
						</p>
					</div>
					<p class="font-semibold text-start text-sm lg:text-base text-black dark:text-white">
						{item.nickname}
					</p>
					<div class="flex items-center gap-[6px]">
						<p class="font-semibold text-sm lg:text-base text-black dark:text-white">
							{item.betAmount}
						</p>
						<img class="w-[24px]" src="/imgs/bitcoin.svg" alt="Bet Amount" />
					</div>
					<p class="text-base font-semibold text-grayDark2">0.001x</p>
					<div class="flex items-center justify-end gap-[6px]">
						<p
							class={`font-semibold text-base ${
								item.profitAmount >= 0 ? 'text-green' : 'text-red'
							}`}
						>
							{item.profitAmount}
						</p>
						<img class="w-[24px]" src="/imgs/bitcoin.svg" alt="Profit Amount" />
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- <div class="w-full flex items-center justify-center mt-[20px]">
		<button class="flex items-center justify-center bg-white9 border border-white11 rounded-[7px] py-[20px] w-[261px] gap-[9px] text-white font-medium text-base opacity-80 hover:opacity-100 transitiona-all">
			Show more
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M16.214 8.28596C16.4703 8.54224 16.4703 8.95776 16.214 9.21404L10.964 14.464C10.7078 14.7203 10.2922 14.7203 10.036 14.464L4.78596 9.21404C4.52968 8.95776 4.52968 8.54224 4.78596 8.28596C5.04224 8.02968 5.45776 8.02968 5.71404 8.28596L10.5 13.0719L15.286 8.28596C15.5422 8.02968 15.9578 8.02968 16.214 8.28596Z" fill="white"/>
			</svg>				
		</button>
	</div> -->
</div>
