<script>
	import { createEventDispatcher } from 'svelte';
	import Select from '../../select/select.svelte';
	import ModalLayout from '../modalLayout.svelte';
	const dispathEvent = createEventDispatcher()
	const fiatCurrencyArr = [
		{ value: 'KRW', label: 'KRW', image: '/imgs/flag1.svg' },
		{ value: 'KRW2', label: 'KRW2', image: '/imgs/bank.svg' },
		{ value: 'KRW3', label: 'KRW3', image: '/imgs/flag1.svg' }
	];
	const paymentMethodArr = [
		{ value: 'bank', label: 'Bank Transfer', image: '/imgs/bank.svg' },
		{ value: 'wire', label: 'Wire Transfer', image: '/imgs/bank.svg' }
	];
	function closeProfileModal() {
		dispathEvent('closeProfileModal')
	}
</script>

<ModalLayout on:closeProfileModal={closeProfileModal} title="Deposit Funds">
	<div class="w-full flex flex-col gap-[15px] mt-[24px]">
		<p class="text-base text-black dark:text-white font-medium">Fiat Currency</p>
		<Select items={fiatCurrencyArr} searchable={true}/>
	</div>

	<div class="w-full flex flex-col gap-[15px] mt-[24px]">
		<p class="text-base text-black dark:text-white font-medium">Choosee Payment Method</p>
		<Select items={paymentMethodArr} />
	</div>

	<div class="relative z-[99] w-full flex flex-col gap-[15px] mt-[24px]">
		<p class="text-base text-black dark:text-white font-medium">Amount</p>
		<div
			class="w-full grid items-center grid-cols-[auto,72px] bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
		>
			<input
				type="text"
				class="w-full h-full bg-transparent py-[17px] outline-none text-black dark:text-white pl-[20px]"
			/>
			<div class="pl-[20px] border-l border-l-grayDark text-grayDark">KRW</div>
		</div>

		<div class="w-full grid grid-cols-3 gap-[15px]">
			<label class="w-full cursor-pointer">
				<input type="radio" name="amount" class="peer sr-only" />
				<div
					class="peer-checked:text-white peer-checked:bg-blue flex items-center justify-center gap-[6px] border border-transparent transition-all w-full text-sm font-medium rounded-[7px] p-[13px] text-black dark:text-white bg-grayLight4 dark:bg-white5"
				>
					KRW 300
				</div>
			</label>
			<label class="w-full cursor-pointer">
				<input type="radio" name="amount" class="peer sr-only" />
				<div
					class="peer-checked:text-white peer-checked:bg-blue flex items-center justify-center gap-[6px] border border-transparent transition-all w-full text-sm font-medium rounded-[7px] p-[13px] text-black dark:text-white bg-grayLight4 dark:bg-white5"
				>
					KRW 300
				</div>
			</label>
			<label class="w-full cursor-pointer">
				<input type="radio" name="amount" class="peer sr-only" />
				<div
					class="peer-checked:text-white peer-checked:bg-blue flex items-center justify-center gap-[6px] border border-transparent transition-all w-full text-sm font-medium rounded-[7px] p-[13px] text-black dark:text-white bg-grayLight4 dark:bg-white5"
				>
					KRW 300
				</div>
			</label>
		</div>
	</div>

	<div class="relative z-[99] w-full flex flex-col gap-[15px] mt-[24px]">
		<p class="text-base text-black dark:text-white font-medium">Account Holder Name</p>
		<div
			class="w-full grid items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
		>
			<input
				type="text"
				class="w-full h-full bg-transparent py-[17px] outline-none text-black dark:text-white pl-[20px]"
			/>
		</div>
	</div>
</ModalLayout>
