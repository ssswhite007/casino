<script>
	import globalStore from '@store/globalStore';
	import { sendEmail, authCodeCheck } from '@apis/account';
	import toast from '@components/toast/toast';

	// Props
	export let chooseWithdrawalMethod = true;
	export let userVerified = true;
	export let onWithdrawMethod = (val) => {
		return val;
	};
	// Components

	let verifyStep = 1;
	const widthdrawMethods = [
		{
			image: '/imgs/banks/america_bank.svg',
			label: 'Bank of America'
		},
		{
			image: '/imgs/banks/fargo.svg',
			label: 'Well Fargo'
		},
		{
			image: '/imgs/banks/hsbc.svg',
			label: 'HSBC'
		},
		{
			image: '/imgs/banks/td_bank.svg',
			label: 'TD Bank'
		}
	];
	const handleWithdrawMethod = (val) => {
		onWithdrawMethod(val);
	};

	let emailSendStatus = false,
		timerLabel = '10:00',
		authCode = '',
		emailVerify = false;

	let phoneSendStatus = false,
		phoneVerify = false;

	let timeInSeconds = 600;

	function updateTimerDisplay() {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		timerLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	let countdownTimer;

	async function onSendEmail() {
		emailSendStatus = true;
		timeInSeconds = 600;
		timerLabel = '10:00';
		countdownTimer = setInterval(() => {
			timeInSeconds--;
			if (timeInSeconds >= 0) updateTimerDisplay();
			else {
				clearInterval(countdownTimer);
				emailSendStatus = false;
				timeInSeconds = 600;
				timerLabel = '10:00';
				authCode = '';
			}
		}, 1000);
		const res = await sendEmail({
			email: $globalStore.userDetail.email
		});
		if (!res.success) {
			clearInterval(countdownTimer);
			emailSendStatus = false;
			timeInSeconds = 600;
			timerLabel = '10:00';
			authCode = '';
		}
	}

	async function onSendPhone() {
		phoneSendStatus = true;
		timeInSeconds = 600;
		timerLabel = '10:00';
		countdownTimer = setInterval(() => {
			timeInSeconds--;
			if (timeInSeconds >= 0) updateTimerDisplay();
			else {
				clearInterval(countdownTimer);
				phoneSendStatus = false;
				timeInSeconds = 600;
				timerLabel = '10:00';
				authCode = '';
			}
		}, 1000);
		const res = await sendEmail({
			email: $globalStore.userDetail.email
		});
		if (!res.success) {
			clearInterval(countdownTimer);
			phoneSendStatus = false;
			timeInSeconds = 600;
			timerLabel = '10:00';
			authCode = '';
		}
	}

	async function onVerify() {
		const res = await authCodeCheck({
			authCode
		});

		if (res.success) {
			clearInterval(countdownTimer);
			toast.success(res.data.message);
			if (verifyStep == 1) emailVerify = true;
			else if (verifyStep == 2) phoneVerify = true;
		} else toast.error(res.data.message);
	}
</script>

<div class="relative w-full z-[9] flex flex-col gap-2 mt-4">
	{#if chooseWithdrawalMethod && verifyStep == 0}
		<p class="text-base text-black dark:text-white font-medium">Withdraw To</p>
		<div class="w-full p-2 gap-2 flex flex-col bg-white5 rounded-[7px]">
			{#each widthdrawMethods as item}
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => handleWithdrawMethod(item.label)}
					class="flex items-center justify-between bg-white5 px-[7px] py-[14px] rounded-[7px]"
				>
					<div class="flex items-center gap-2">
						<img src={item.image} class="w-full max-w-[30px]" width="30" alt="" />
						<p class="text-sm font-medium mt-1 text-white">{item.label}</p>
					</div>
					<svg class="w-[18px] h-[18px] ml-auto transition-all">
						<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#chevron-down" />
					</svg>
				</div>
			{/each}
			<p class="text-gray text-base font-medium text-center cursor-pointer">Show more</p>
		</div>
	{:else if verifyStep === 1}
		<div class="w-full rounded-[7px] bg-white5 p-5 flex flex-col gap-5">
			<p class="text-base text-black dark:text-white font-medium">Verification</p>
			<div class="relative flex flex-col gap-[52px]">
				<div
					class="border-l border-dashed absolute h-[calc(100%-60px)] top-[50%] translate-y-[-50%] left-[9.5px] w-[1px] border-white11"
				/>
				<div class="flex items-centeer gap-3 z-[9]">
					{#if emailVerify == false}
						<div
							class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-red"
						>
							<svg class="w-[10px] h-[10px] mt-[1px]">
								<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
							</svg>
						</div>
					{:else}
						<div
							class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-green opacity-50"
						>
							<svg class="w-[10px] h-[10px] mt-[1px]">
								<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
							</svg>
						</div>
					{/if}
					<p class="text-white font-medium">
						Step 1: <span class="text-white">Email Verification</span>
					</p>
				</div>
				<div class="flex items-centeer gap-3 z-[9]">
					<div
						class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-gray opacity-50"
					>
						<svg class="w-[10px] h-[10px] mt-[1px]">
							<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
						</svg>
					</div>
					<p class="text-white font-medium opacity-50">
						Step 2: <span class="text-white">Phone Verification</span>
					</p>
				</div>
			</div>
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto mt-4">
			<p class="text-base text-black dark:text-white font-medium">Email Address</p>
			<div
				class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red {emailSendStatus ==
				false
					? ''
					: 'opacity-50'}"
			>
				<input
					type="text"
					value={$globalStore.userDetail.email}
					disabled={true}
					class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
				/>
				{#if emailSendStatus == false}
					<button
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto"
						on:click={onSendEmail}>Send</button
					>
				{:else}
					<button
						disabled={true}
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto opacity-50"
						>{timerLabel}</button
					>
				{/if}
			</div>
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto mt-4">
			<p class="text-base text-black dark:text-white font-medium">Enter Code</p>
			{#if emailSendStatus == false || emailVerify}
				<div
					class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red opacity-50"
				>
					<input
						type="text"
						maxlength="5"
						bind:value={authCode}
						disabled
						class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
					/>
					<button
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto opacity-50"
						disabled>Verify</button
					>
				</div>
			{:else}
				<div
					class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
				>
					<input
						type="text"
						maxlength="5"
						bind:value={authCode}
						class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
					/>
					<button
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto"
						on:click={onVerify}>Verify</button
					>
				</div>
			{/if}
		</div>

		<button
			on:click={() => {
				if (emailVerify) {
					verifyStep = 2;
					authCode = '';
				}
			}}
			class="w-full py-4 bg-primary text-white rounded-[7px] mt-6 {emailVerify ? '' : 'opacity-50'}" disabled={!emailVerify}>Next Step</button
		>
	{:else if verifyStep === 2}
		<div class="w-full rounded-[7px] bg-white5 p-5 flex flex-col gap-5">
			<p class="text-base text-black dark:text-white font-medium">Verification</p>
			<div class="relative flex flex-col gap-[52px]">
				<div
					class="border-l border-dashed absolute h-[calc(100%-60px)] top-[50%] translate-y-[-50%] left-[9.5px] w-[1px] border-white11"
				/>
				<div class="flex items-centeer gap-3 z-[9]">
					<div
						class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-green opacity-50"
					>
						<svg class="w-[10px] h-[10px] mt-[1px]">
							<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
						</svg>
					</div>
					<p class="text-white font-medium opacity-50">
						Step 1: <span class="text-white">Email Verification</span>
					</p>
				</div>
				<div class="flex items-centeer gap-3 z-[9]">
					{#if phoneVerify == false}
						<div
							class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-red"
						>
							<svg class="w-[10px] h-[10px] mt-[1px]">
								<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
							</svg>
						</div>
					{:else}
						<div
							class="mt-[1px] w-[21px] h-[21px] rounded-full flex items-center justify-center bg-green opacity-50"
						>
							<svg class="w-[10px] h-[10px] mt-[1px]">
								<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#close" />
							</svg>
						</div>
					{/if}

					<p class="text-white font-medium">
						Step 2: <span class="text-white">Phone Verification</span>
					</p>
				</div>
			</div>
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto mt-4">
			<p class="text-base text-black dark:text-white font-medium">Phone Number</p>
			<div
				class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red {phoneSendStatus ==
				false
					? ''
					: 'opacity-50'}"
			>
				<input
					type="text"
					value="+123456789"
					disabled={true}
					class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
				/>
				{#if phoneSendStatus == false}
					<button
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto"
						on:click={onSendPhone}>Send</button
					>
				{:else}
					<button
						disabled={true}
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto opacity-50"
						>{timerLabel}</button
					>
				{/if}
			</div>
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto mt-4">
			<p class="text-base text-black dark:text-white font-medium">Enter Code</p>
			{#if phoneSendStatus == false || phoneVerify}
				<div
					class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
				>
					<input
						type="text"
						maxlength="5"
						bind:value={authCode}
						disabled
						class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
					/>
					<button class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto opacity-50" disabled>Verify</button>
				</div>
			{:else}
				<div
					class="w-full grid grid-cols-[auto,auto] items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red"
				>
					<input
						type="text"
						maxlength="5"
						bind:value={authCode}
						class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white50 pl-[20px] pr-[20px]"
					/>
					<button
						class="w-full py-4 bg-primary text-white rounded-[7px] ml-auto"
						on:click={onVerify}>Verify</button
					>
				</div>
			{/if}
		</div>

		<button
			on:click={() => {
				if(phoneVerify) verifyStep = 0
			}}
			class="w-full py-4 bg-primary text-white rounded-[7px] mt-6 {emailVerify ? '' : 'opacity-50'}" disabled={!phoneVerify}>Confirm Verification</button
		>
	{/if}
</div>
