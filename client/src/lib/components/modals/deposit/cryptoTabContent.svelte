<script>
	import Select from '../../select/select.svelte';

	const newtworkAr = [
		{
			value: 'TRC',
			label: 'TRC20'
		},
		{
			value: 'USDT',
			label: 'USDT22'
		}
	];

	const secretKey = 'xzyncptqpk62vahrmujoazyzjuq4yc3m';
	let keyCopied = false;
	let loadingForNextCopy = 2500; // milesecs
	function copySecretKey() {
		// Copy the text inside the text field
		navigator.clipboard.writeText(secretKey);
		keyCopied = true;
		setTimeout(() => {
			keyCopied = false;
		}, loadingForNextCopy);
	}

	let otpValues = ['', '', '', '', '', '', ''];
</script>

<div class="flex flex-col gap-7">
	<div class="w-full flex flex-col gap-[15px] mt-[24px]">
		<p class="text-base text-black dark:text-white font-medium">Choose Network</p>
		<Select items={newtworkAr} searchable={true} />
	</div>

	<div class="flex items-center gap-3">
		<div class="w-full max-w-[110px]">
			<img class="w-full" src="/imgs/qr.svg" alt="" />
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto">
			<p class="text-base text-black dark:text-white font-medium">Your secret key</p>
			<div
				class="w-full grid grid-cols-[auto,50px] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
			>
				<input
					type="text"
					disabled
					value={secretKey}
					class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
				/>
				{#if !keyCopied}
					<svg on:click={copySecretKey} class="w-[22px] h-[22px] group cursor-pointer">
						<use
							class="group-hover:fill-black dark:group-hover:fill-white fill-black21 dark:fill-white11 transition-all"
							href="/imgs/icons/icons.svg#copy"
						/>
					</svg>
				{:else}
					<p class="absolute right-[20px] text-sm text-green font-medium">Copied</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="p-4 border border-white5 bg-white5 rounded-[7px]">
		<p class="text-gray font-regular text-base">
			<span class="text-white">Note:</span> Send only BTC to this address. Coins will be deposited after
			2 network confirmations.
		</p>
	</div>
</div>
<button class=" mt-6 w-full py-4 bg-primary text-white rounded-[7px] mt-auto">Confirm Deposit</button>
