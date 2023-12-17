<script>
	import { onMount } from "svelte";

	const betActicityArr = [
		{
			type: 'latest bets',
			game: {
				image: '/imgs/game1.svg',
				title: 'Ring of fortune'
			},
			player: 'bountyHunter31',
			betAmount: {
				amount: '104.54',
				image: '/imgs/bitcoin.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: false,
				profit: '21.567',
				image: '/imgs/bitcoin.svg'
			}
		},
		{
			type: 'latest bets',
			game: {
				image: '/imgs/game2.svg',
				title: 'Ring of fortune'
			},
			player: 'unknown',
			betAmount: {
				amount: '104.54',
				image: '/imgs/eth.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: true,
				profit: '21.567',
				image: '/imgs/eth.svg'
			}
		},
		{
			type: 'latest bets',
			game: {
				image: '/imgs/game3.svg',
				title: 'Ring of fortune'
			},
			player: 'wdwdw21',
			betAmount: {
				amount: '104.54',
				image: '/imgs/eth.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: true,
				profit: '21.567',
				image: '/imgs/eth.svg'
			}
		},

		{
			type: 'recent deposits',
			game: {
				image: '/imgs/game4.svg',
				title: 'Ring of fortune'
			},
			player: 'gmaksd askd',
			betAmount: {
				amount: '104.54',
				image: '/imgs/bitcoin.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: false,
				profit: '21.567',
				image: '/imgs/bitcoin.svg'
			}
		},
		{
			type: 'recent deposits',
			game: {
				image: '/imgs/game4.svg',
				title: 'Ring of fortune'
			},
			player: 'gmaksd askd',
			betAmount: {
				amount: '104.54',
				image: '/imgs/bitcoin.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: false,
				profit: '21.567',
				image: '/imgs/bitcoin.svg'
			}
		},
		{
			type: 'recent deposits',
			game: {
				image: '/imgs/game1.svg',
				title: 'Ring of fortune'
			},
			player: 'uadasd123',
			betAmount: {
				amount: '104.54',
				image: '/imgs/eth.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: true,
				profit: '21.567',
				image: '/imgs/eth.svg'
			}
		},
		{
			type: 'recent deposits',
			game: {
				image: '/imgs/game2.svg',
				title: 'Ring of fortune'
			},
			player: 'blabla bla',
			betAmount: {
				amount: '104.54',
				image: '/imgs/eth.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: true,
				profit: '21.567',
				image: '/imgs/eth.svg'
			}
		},

		{
			type: 'recent withdrawals',
			game: {
				image: '/imgs/game2.svg',
				title: 'Ring of fortune'
			},
			player: 'blabla bla',
			betAmount: {
				amount: '104.54',
				image: '/imgs/eth.svg'
			},
			multiplier: '0.001x',
			profitAmount: {
				isProfit: true,
				profit: '21.567',
				image: '/imgs/eth.svg'
			}
		}
	];
	let dynamicBetActivityArr = betActicityArr;
    let activeFilter = 'latest bets';

    onMount(()=> {
        updateDynamicBetActivityArr()
    })
    function handleFilter(filter) {
        activeFilter = filter.toLowerCase()
        updateDynamicBetActivityArr()
    }
    function updateDynamicBetActivityArr() {
        dynamicBetActivityArr = betActicityArr.filter(item => {
            if(item.type.toLowerCase() === activeFilter.toLowerCase()) {
                return item
            }
        });
    }
</script>

<div class="w-full flex flex-col items-start gap-[15px] mt-[37px]">
	<div class="w-full flex items-center justify-between">
		<h6 class="font-semibold text-xl gradient-text-white2">
			Recent Bet Deposits & Withdrawal History
		</h6>
	</div>

	<div class="relative w-full">
		<ul class="flex flex-wrap items-center gap-[40px] mt-[20px]">
			<li on:click={()=> handleFilter('latest bets')}
				class={`${activeFilter.toLowerCase() === 'latest bets' ? 'active' : ''} gradient-text text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				Latest Bets
			</li>
			<li on:click={()=> handleFilter('recent Deposits')}
				class={`${activeFilter.toLowerCase() === 'recent deposits' ? 'active' : ''} gradient-text text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				Recent Deposits
			</li>
			<li on:click={()=> handleFilter('recent Withdrawals')}
				class={`${activeFilter.toLowerCase() === 'recent withdrawals' ? 'active' : ''} gradient-text text-xs font-semibold uppercase pb-[14px] cursor-pointer hover-gradient-text transition-all`}
			>
				Recent Withdrawals
			</li>
		</ul>
	</div>

	<div class="w-full mt-[20px] flex flex-col">
		<div class="w-full grid grid-cols-5 rounded-[14px] bg-black21 px-[28px] py-[20px]">
			<p class="text-base font-medium text-white">Game</p>
			<p class="text-base font-medium text-white">Player</p>
			<p class="text-base font-medium text-white">Bet Amount</p>
			<p class="text-base font-medium text-white">Multiplier</p>
			<p class="text-end text-base font-medium text-white">Profit Amount</p>
		</div>
		<div class="w-full flex flex-col px-[28px]">
			{#each dynamicBetActivityArr as item}
				<div
					class="relative w-full grid grid-cols-5 py-[23px] before:content-[''] before:absolute before:top-full before:left-[50%] before:translate-x-[-50%] before:w-[97%] before:h-[1px] before:bg-blackDark2"
				>
					<div class="flex items-center gap-[10px]">
						<img class="w-[19px]" src={item.game.image} alt={item.game.title} />
						<p class="text-base font-semibold text-grayDark2">{item.game.title}</p>
					</div>
					<p class="font-semibold text-start text-base text-white">{item.player}</p>
					<div class="flex items-center gap-[6px]">
						<p class="font-semibold text-base text-white">{item.betAmount.amount}</p>
						<img class="w-[24px]" src={item.betAmount.image} alt="Bet Amount" />
					</div>
					<p class="text-base font-semibold text-grayDark2">{item.multiplier}</p>
					<div class="flex items-center justify-end gap-[6px]">
                        {#if item.profitAmount.isProfit }
						    <p class="font-semibold text-base text-green">+ {item.profitAmount.profit}</p>
                        {:else if !item.profitAmount.isProfit}
                            <p class="font-semibold text-base text-green">- {item.profitAmount.profit}</p>
                        {/if}
						<img class="w-[24px]" src={item.profitAmount.image} alt="Profit Amount" />
					</div>
				</div>
			{/each}
		</div>
	</div>

	<diiv class="w-full flex items-center justify-center mt-[20px]">
		<button class="flex items-center justify-center bg-white9 border border-white11 rounded-[7px] py-[20px] w-[261px] gap-[9px] text-white font-medium text-base opacity-80 hover:opacity-100 transitiona-all">
			Show more
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M16.214 8.28596C16.4703 8.54224 16.4703 8.95776 16.214 9.21404L10.964 14.464C10.7078 14.7203 10.2922 14.7203 10.036 14.464L4.78596 9.21404C4.52968 8.95776 4.52968 8.54224 4.78596 8.28596C5.04224 8.02968 5.45776 8.02968 5.71404 8.28596L10.5 13.0719L15.286 8.28596C15.5422 8.02968 15.9578 8.02968 16.214 8.28596Z" fill="white"/>
			</svg>				
		</button>
	</diiv>
</div>
