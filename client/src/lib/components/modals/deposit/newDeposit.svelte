<script>
	import { createEventDispatcher } from 'svelte';
	import Select from '../../select/select.svelte';
	import ModalLayout from '../modalLayout.svelte';
	import FilterBtn from '../../filter/filterBtn.svelte';
	import Withdraw from '../withdraw/withdraw.svelte';
	import FiatTabContent from './fiatTabContent.svelte';
	import CryptoTabContent from './cryptoTabContent.svelte';
	const dispathEvent = createEventDispatcher();
	function createLabel(value, label, imageSrc) {
		return `<div class="flex items-center w-full justify-between">
      
      <div class="flex items-center gap-2">
        <img src="${imageSrc}" alt="${value}"/>
        <p class="font-medium text-base text-white uppercase">${value}</p>
      </div>
      <p class="text-white font-medium text-base dark:text-white">
				<span class="text-grayLight">Balance:</span>
				${label}
			</p>
    </div>`;
	}

	const fiatCurrencyArr = [
		{
			value: 'BTC',
			labelHTML: createLabel('BTC', '$520.00', '/imgs/bitcoin.svg'), // for options
			image: '/imgs/bitcoin.svg',
			label: '$520.00'
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
	function closeProfileModal() {
		dispathEvent('closeProfileModal');
	}

	const withdrawFilterTabs = [
		{
			label: 'Crypto',
			value: 'crypto'
		},
		{
			label: 'Fiat',
			value: 'fiat'
		}
	];
	let activeTab = withdrawFilterTabs[0].value;
	const handleFilter = (activeValue) => {
		activeTab = activeValue;
		return activeValue;
	};

	let chooseWithdrawalMethod = true;
	const handleWithdrawMethod = (val) => {
		chooseWithdrawalMethod = false;
		return val;
	};

	let userVerified = false;
</script>

<ModalLayout on:closeProfileModal={closeProfileModal} title="Deposit" id="newDepositModal">
	<div class="mt-4">
		<FilterBtn
			filters={withdrawFilterTabs}
			active={withdrawFilterTabs[0].value}
			onFilter={handleFilter}
		/>
	</div>

	<div class="relative z-[99] w-full flex flex-col justify-between mt-[24px]">
		{#if userVerified || activeTab === 'crypto'}
			<div class="w-full flex flex-col gap-[15px]">
				<p class="text-base text-black dark:text-white font-medium">Withdraw Currency</p>
				<Select items={fiatCurrencyArr} searchable={true} balance="532.00" classname="gap-0" />
			</div>
		{/if}
		{#if activeTab === 'crypto'}
			<CryptoTabContent />
		{:else if activeTab === 'fiat'}
			<FiatTabContent
				{userVerified}
				{chooseWithdrawalMethod}
				onWithdrawMethod={handleWithdrawMethod}
			/>
		{/if}
	</div>
</ModalLayout>
