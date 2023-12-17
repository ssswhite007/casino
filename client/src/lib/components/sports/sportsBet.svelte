<script>
	import { onMount } from 'svelte';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";

	export let sportTabs;
	export let sportItems;
	export let activeTab;
	export let title;
	export let seeAll;
	export let filter;

	let dynamicSportItems = sportItems; // use dynamicSportItems as dynamicArray
	// currentTab must be same as sportTabs title
	let currentTab = activeTab; // you can add as uppercase as lowercase chars because in filter when compare to string to each other both string willl be transform to lowerCase letters

	function handleFilter(title) {
		currentTab = title.toLowerCase();
		updateDynamicSportsItems();
	}
	function updateDynamicSportsItems() {
		dynamicSportItems = sportItems.filter((item) => {
			if (item.type.toLowerCase() === currentTab.toLowerCase()) {
				return item;
			}
		});
	}
	onMount(() => {
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
		updateDynamicSportsItems();
	});
</script>

<div class="w-full flex flex-col items-start gap-[15px] mt-[37px]">
	<div class="w-full flex items-center justify-between">
		{#if title}
			<h6 class="font-semibold text-xl gradient-text-white2 main">{title}</h6>
		{/if}
	</div>
	<div
		class={`${
			filter === 'scroll' ? 'md:flex-wrap dragable overflow-auto scrollbar-hidden' : 'flex-wrap'
		} w-full flex items-center gap-[15px]`}
	>
		{#each sportTabs as tab}
			<div
				on:click={() => handleFilter(tab.title)}
				class={`${
					currentTab.toLowerCase() === tab.title.toLowerCase() ? 'bg-linear active-p-white' : ''
				} ${
					tab.hide ? 'hidden sm:flex' : 'flex'
				} min-w-max group items-center gap-[8px] p-[12px] bg-black5 dark:bg-white5 border border-black5 dark:border-white11 rounded-[7px] cursor-pointer hover:bg-linear`}
			>
				<img class="w-[15px] mb-[3px]" src={tab.image} alt={tab.title} />
				<p
					class="group-hover:text-white text-black dark:text-white text-xs sm:text-sm font-normal uppercase"
				>
					{$LL[tab.title]()}
				</p>
			</div>
		{/each}
		{#if seeAll}
			<a
				href="/"
				class="flex sm:hidden ml-auto gradient-text hover:text-blue transition-all font-normal text-sm"
				>See All</a
			>
		{/if}
	</div>
	<div class="w-full flex flex-col gap-[15px] mt-[5px]">
		{#each dynamicSportItems as item}
			<div class="w-full bg-white dark:bg-blackDark px-[13px] pt-[13px] pb-[11px] rounded-[7px]">
				<div class="w-full grid gap-[10px] sm:gap-[15px] md:gap-[0px] md:grid-cols-[450px,1fr]">
					<div class="flex items-center">
						<div
							class="flex flex-col items-center gap-[4px] pr-[10px] border-r border-grayLight dark:border-r-white9 mr-[10px]"
						>
							<p
								class="min-w-max text-xs sm:text-base font-medium text-grayDark dark:text-grayLight"
							>
								{item.timeData.time}
							</p>
							<p class="min-w-max text-xs sm:text-base font-medium text-black dark:text-grayDark2">
								{item.timeData.date}
							</p>
						</div>
						<div class="flex flex-col gap-[12px] sm:gap-[20px]">
							<div class="flex items-center gap-[5px]">
								<img class="w-[14px] sm:w-[16px]" src="/imgs/global.svg" alt="global" />
								<p class="text-xs sm:text-sm uppercase font-medium text-grayDark2">
									{item.content}
								</p>
							</div>
							<div class="flex items-center gap-[15px] sm:gap-[31px]">
								<div class="flex items-center gap-[6px] sm:gap-[10px]">
									<img
										class="w-[22px] sm:w-[27px]"
										src={item.teams.team1.image}
										alt={item.teams.team1.title}
									/>
									<p class="text-sm sm:text-base font-bold text-black dark:text-grayLight">
										{item.teams.team1.title}
									</p>
								</div>
								<p class="text-sm font-normal text-grayDark2">{$LL.VS()}</p>
								<div class="flex items-center gap-[6px] sm:gap-[10px]">
									<img
										class="w-[22px] sm:w-[27px]"
										src={item.teams.team2.image}
										alt={item.teams.team2.title}
									/>
									<p class="text-sm sm:text-base font-bold text-black dark:text-grayLight">
										{item.teams.team2.title}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div
						class="border-t border-t-grayLight dark:border-t-white11 mt-[10px] sm:mt-[15px] md:mt-[0px] py-[15px] md:border-none md:py-[0px] flex cursor-draggable items-center gap-[10px] dragable overflow-auto scrollbar-hidden"
					>
						<div class="flex items-center gap-[5px]">
							<div class="flex flex-col gap-[5px] items-center">
								<p class="text-xs sm:text-sm font-bold text-grayDark2">1</p>
								<div
									class="flex items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
								>
									{item.bet.first}
								</div>
							</div>
							<div class="flex flex-col gap-[5px] items-center">
								<p class="text-xs sm:text-sm font-bold text-grayDark2">X</p>
								<div
									class="flex items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
								>
									{item.bet.x}
								</div>
							</div>
							<div class="flex flex-col gap-[5px] items-center">
								<p class="text-xs sm:text-sm font-bold text-grayDark2">2</p>
								<div
									class="flex items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
								>
									{item.bet.second}
								</div>
							</div>
						</div>
						<div class="flex flex-col gap-[5px] items-center">
							<p class="text-xs sm:text-sm font-bold text-grayDark2">{$LL.HANDICAP()}</p>
							<div class="flex items-center gap-[5px]">
								<div
									class="flex flex-col items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
								>
									<p class="text-xs font-medium text-green">{item.handicap.first.subTitle}</p>
									<p class="text-sm sm:text-base font-medium text-black dark:text-white">
										{item.handicap.first.title}
									</p>
								</div>
								<div
									class="flex flex-col items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
								>
									<p class="text-xs font-medium text-red">{item.handicap.second.subTitle}</p>
									<p class="text-sm sm:text-base font-medium text-black dark:text-white">
										{item.handicap.second.title}
									</p>
								</div>
							</div>
						</div>
						<div class="flex flex-col gap-[5px] items-center">
							<p class="text-sm font-bold text-grayDark2">{$LL.TOTAL()}</p>
							<div class="flex items-center gap-[5px]">
								{#each item.total as totalItem}
									<div
										class="flex flex-col items-center justify-center rounded-[7px] text-black dark:text-white cursor-pointer hover:border-blue text-sm sm:text-base w-[65px] sm:w-[81px] h-[52px] bg-grayLight4 dark:bg-white5 border border-grayLight2 dark:border-white11"
									>
										<p class="text-xs font-medium text-grayDark2">{totalItem.subTitle}</p>
										<p class="text-sm sm:text-base font-medium text-black dark:text-white">
											{totalItem.title}
										</p>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
