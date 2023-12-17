<script>
	import { createEventDispatcher } from "svelte";

	const betSlipArr = [
		{
			type: 'basketball',
			image: '/imgs/live-sports/basket-ball.svg',
			groups: {
				group1: 'Memphis',
				group2: 'Houston'
			},
			hashtags: ['Handicap', 'Game', 'NCAA'],
			leader: 'Memphis +12.0',
			betX: '1.425'
		},
		{
			type: 'basketball',
			image: '/imgs/live-sports/basket-ball.svg',
			groups: {
				group1: 'Memphis2',
				group2: 'Houston2'
			},
			hashtags: ['NCAA'],
			leader: 'Houston +32.0',
			betX: '1.425'
		},
		{
			type: 'basketball',
			image: '/imgs/live-sports/basket-ball.svg',
			groups: {
				group1: 'Memphis',
				group2: 'Houston'
			},
			hashtags: ['Handicap', 'Game', 'NCAA'],
			leader: 'Memphis +12.0',
			betX: '1.425'
		},
		{
			type: 'basketball',
			image: '/imgs/live-sports/basket-ball.svg',
			groups: {
				group1: 'Memphis2',
				group2: 'Houston2'
			},
			hashtags: ['NCAA'],
			leader: 'Houston +32.0',
			betX: '1.425'
		}
	];
    const dispathEvent = createEventDispatcher()
    function closeBetSlip() {
        dispathEvent('closeBetSlip')
    }
</script>

<div
	class="betslip-modal fixed md:right-[25px] bottom-[70px] md:bottom-[0px] w-full md:max-w-[340px] z-[99999999] md:z-[9999] md:rounded-t-[7px] overflow-hidden"
>
	<div class="w-full flex flex-col bg-white dark:bg-blueDark h-auto max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-115px)]">
		<div class="sticky flex flex-col top-0 w-full">
			<div class="w-full flex items-center justify-between bg-linear px-[17px] py-[10px]">
				<div class="flex items-center gap-[4px]">
					<label class="cursor-pointer">
						<input checked type="radio" name="betSlip" id="" class="sr-only peer" />
						<div
							class="px-[19px] py-[14px] text-sm md:text-base rounded-[7px] bg-transparent dark:text-white50 peer-checked:bg-white5 peer-checked:text-white"
						>
							Bet Slip
						</div>
					</label>
					<label class="cursor-pointer">
						<input type="radio" name="betSlip" id="" class="sr-only peer" />
						<div
							class="px-[19px] py-[14px] text-sm md:text-base rounded-[7px] bg-transparent text-white50 peer-checked:bg-white5 peer-checked:text-white"
						>
							My Bets
						</div>
					</label>
				</div>
				<div on:click={closeBetSlip}
					class="cursor-pointer opacity-80 hover:opacity-100 transition-all w-[31px] h-[31px] rounded-full bg-white11 flex items-center justify-center"
				>
					<svg class="w-[16px] h-[16px]">
						<use class="fill-white" href="/imgs/icons/icons.svg#close" />
					</svg>
				</div>
			</div>
			<div class="w-full flex items-center justify-around">
				<label
					class="relative cursor-pointer w-full flex items-center justify-center py-[15px] border-b border-b-grayLight dark:border-b-blueDark2"
				>
					<input checked type="radio" value="single" name="quantity" class="sr-only peer" />
					<p class="font-medium text-sm md:text-base text-black50 dark:text-white32 peer-checked:text-black dark:peer-checked:text-white">Single</p>
					<img
						class="absolute bottom-0 w-full opacity-0 peer-checked:left-0 peer-checked:opacity-100 left-[100px] transition-all"
						src="/imgs/borderGradient.svg"
						alt=""
					/>
				</label>
				<label
					class="relative cursor-pointer w-full flex items-center justify-center py-[15px] border-b border-b-grayLight dark:border-b-blueDark2"
				>
					<input type="radio" value="multiple" name="quantity" class="sr-only peer" />
					<p class="font-medium text-sm md:text-base text-black50 dark:text-white32 peer-checked:text-black dark:peer-checked:text-white">Multiples</p>
					<img
						class="absolute bottom-0 w-full opacity-0 peer-checked:right-0 peer-checked:opacity-100 right-[100px] transition-all"
						src="/imgs/borderGradient.svg"
						alt=""
					/>
				</label>
			</div>
		</div>
		<div class="w-full flex flex-col gap-[12px] overflow-auto custom-scrollbar">
			{#each betSlipArr as item}
				<div
					class="w-full flex flex-col gap-[6px] md:gap-[11px] hover:bg-white5 transition-all py-[18px] px-[22px] border-b border-b-white11"
				>
					<div class="w-full flex flex items-start justify-between">
						<div class="flex flex-col gap-[7px]">
							<div class="flex items-center gap-[6px]">
								<img class="w-[14px]" src={item.image} alt={item.type} />
								<p class="text-sm font-medium text-black dark:text-white">
									{item.groups.group1} - {item.groups.group2}
								</p>
							</div>
							<p class="text-xs text-black50 dark:text-white50 font-medium">
								{#each item.hashtags as hashtag, index}
									{hashtag + ' '}
									{#if index !== item.hashtags.length - 1}
										{' - '}
									{/if}
								{/each}
							</p>
						</div>
						<div
							class="cursor-pointer group hover:bg-red transition-all bg-red30 transition-all w-[31px] h-[31px] rounded-full flex items-center justify-center"
						>
							<svg class="w-[15px] h-[12px]">
								<use
									class="fill-red group-hover:fill-white transition-all"
									href="/imgs/icons/icons.svg#close"
								/>
							</svg>
						</div>
					</div>
					<div class="w-full flex items-center justify-between">
						<p class="text-black dark:text-white font-medium text-sm">{item.leader}</p>
						<div
							class="px-[12px] py-[8px] bg-linear rounded-[7px] text-white text-xs font-semibold"
						>
							{item.betX}
						</div>
					</div>
					<div class="w-full grid grid-cols-2 gap-[16px]">
						<div
							class="w-full grid items-center grid-cols-[auto,50px] bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
						>
							<input
								type="text"
								class="w-full h-full bg-transparent py-[9px] outline-none text-black dark:text-white text-sm pl-[13px]"
							/>
							<div class="pl-[13px] border-l border-l-grayDark text-black50 dark:text-grayDark">Bet</div>
						</div>
						<div
							class="w-full grid items-center grid-cols-[auto,50px] bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
						>
							<input
								type="text"
								class="w-full h-full bg-transparent py-[9px] outline-none text-black dark:text-white text-sm pl-[13px]"
							/>
							<div class="pl-[13px] border-l border-l-grayDark text-black50 dark:text-grayDark">Bet</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div
			class="sticky flex flex-col bottom-0 w-full px-[19px] py-[15px] bg-grayLight2 dark:bg-white5 border-t border-grayLight dark:border-t-white11"
		>
			<div class="w-full flex items-center justify-between">
				<div class="flex flex-col gap-[10px]">
					<p class="text-xs font-medium text-black50 dark:text-white50">Total Bet</p>
					<p class="text-base font-semibold text-black dark:text-white">Possible Win</p>
				</div>
				<div class="flex flex-col gap-[10px]">
					<p class="text-xs font-medium text-black50 dark:text-white50">0.0001 <span class="font-bold">Ƀ</span></p>
					<p class="text-base font-semibold text-black dark:text-white">0.0024 <span class="font-bold">Ƀ</span></p>
				</div>
			</div>
			<button
				class="relative z-[99] w-full py-[12px] bg-linear rounded-[7px] mt-[17px] text-white font-medium opacity-80 hover:opacity-100 transition-all"
				>Place Bet</button
			>
			<div class="w-full flex justify-center mt-[15px]">
				<div
					class="flex items-center gap-[8px] cursor-pointer group opacity-70 hover:opacity-100 transition-all"
				>
					<svg class="w-[18px] h-[18px]">
						<use
							class="stroke-red fill-transparent"
							href="/imgs/icons/icons.svg#trash"
						/>
					</svg>
					<p class="text-red font-medium text-sm">Remove All</p>
				</div>
			</div>
		</div>
	</div>
</div>
