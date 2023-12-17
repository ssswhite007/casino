<script>
	import globalStore from '@store/globalStore';
	import Select from '../../components/select/select.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: chatOpen = $globalStore.chatOpen;

	function chatToggle(e) {
		chatOpen
			? document.body.classList.remove('chat-active')
			: document.body.classList.add('chat-active');
		globalStore.toggleItem('chatOpen', !$globalStore.chatOpen);
	}

	function openProfileMenu() {
		dispatch('openProfileMenu');
	}

	function openBetSlip() {
		dispatch('openBetSlip');
	}
	function openNewDepositModal() {
		globalStore.toggleItem("newDepositModal", true)
	}

	function createLabel(value, label, imageSrc) {
		return `<div class="flex items-center w-full justify-between">
      <p class="text-black dark:text-white font-medium text-base"> ${label}</p>
      <div class="flex items-center gap-2">
        <img src="${imageSrc}" alt="${value}"/>
        <p class="font-medium text-base text-black dark:text-white uppercase">${value}</p>
      </div>
    </div>`;
	}

	const fiatCurrencyArr = [
		{
			value: 'BTC',
			labelHTML: createLabel('BTC', '$520.00', '/imgs/bitcoin.svg'), // for options
			image: '/imgs/bitcoin.svg',
			label: '$520.00',
		},
		{
			value: 'USD',
			labelHTML: createLabel('USD', '$520.00', '/imgs/bitcoin.svg'), // for options
			label: '$520.00',
			image: '/imgs/bitcoin.svg'
		},
		{
			value: 'ASD',
			labelHTML: createLabel('ASD', '$520.00', '/imgs/bitcoin.svg'), // for options
			label: '$520.00',
			image: '/imgs/bitcoin.svg'
		}
	];
</script>

<div class="flex items-center md:gap-[25px] lg:gap-[50px]">
	<div class="flex items-center gap-[23px]">
		<div
			class="hidden md:flex cursor-pointer flex items-center opacity-70 hover:opacity-100 transition-all"
		>
			<svg class="w-[24px] h-[24px]">
				<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#bell" />
			</svg>
		</div>
		<button
			on:click={chatToggle}
			class="hidden md:flex w-[49px] h-[44px] gradient-border rounded-[7px] before:rounded-[7px] bg-purpleLight2 dark:bg-blueDark items-center justify-center"
		>
			<img class="w-[24px]" src="/imgs/chatLinear.svg" alt="" />
		</button>
	</div>
	<div class="flex items-center gap-[15px] lg:gap-[20px]">
		<button
			on:click={openBetSlip}
			class="hidden md:flex gradient-border bg-purpleLight2 dark:bg-blueDark px-[21px] h-[47px] items-center justify-center rounded-[7px] before:rounded-[7px]"
		>
			<p class="text-base font-medium gradient-text hidden lg:flex">Bet Slip</p>
			<p class="text-base font-semibold gradient-text lg:hidden flex">BS</p>
		</button>
		<!-- <button class="group flex items-center gap-[8px] rounded-full p-[7px] bg-yellow25">
			<img class="w-[21px]" src="/imgs/coin.svg" alt="">
			<p class="text-yellow dark:text-white text-base font-normal">$ { $globalStore.userDetail.game_money }</p>
			<div
				class="group-hover:shadow-lgBlue w-[21px] h-[21px] bg-linear rounded-full flex items-center justify-center"
			>
			<img class="w-[21px]" src="/imgs/add.svg" alt="">
			</div>
		</button> -->

		<div class="relative flex items-center">
			<Select items={fiatCurrencyArr} searchable={true} imagePrepend={false} classname="!max-w-max h-[47px] !rounded-tr-[0px] !rounded-br-[0px] gap-0" textClassname="mb-[2px]"/>

			<div on:click={openNewDepositModal}
				class="cursor-pointer flex items-center justify-center px-3 h-[47px] bg-primary rounded-tr-[7px] rounded-br-[7px]"
			>
				<p class="text-white text-base">Wallet</p>
			</div>
		</div>
		<div
			on:click={openProfileMenu}
			id="headerProfile"
			class="flex items-center gap-[9px] cursor-pointer"
		>
			<div
				class="relative w-[48px] h-[48px] rounded-full border border-grayLight dark:border-white50"
			>
				<img
					class="absolute w-full h-full object-cover rounded-full"
					src={$globalStore.userDetail.profileImage}
					alt="profile image"
				/>
				<img
					class="lg:hidden w-[14px] absolute top-[calc(100%-10px)] left-[50%] translate-x-[-50%]"
					src="/imgs/medal.svg"
					alt=""
				/>
			</div>
			<div class="hidden lg:flex flex-col gap-[2px]">
				<p class="text-black dark:text-white text-base font-normal">
					{$globalStore.userDetail.nickname}
				</p>
				<div class="flex items-center gap-[7px]">
					<img class="w-[14px]" src="/imgs/medal.svg" alt="" />
					<p class="text-gray font-normal text-base">level {$globalStore.userDetail.level}</p>
				</div>
			</div>
			<svg class="w-[20px] h-[20px] hidden lg:block">
				<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#chevron-down" />
			</svg>
		</div>
	</div>
</div>
