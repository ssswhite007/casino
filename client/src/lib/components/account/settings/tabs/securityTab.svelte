<script>
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

	function handleInput(index) {
		const inputValue = otpValues[index];

		if (inputValue === undefined || inputValue === null || inputValue === '') {
			// Input is undefined, null, or empty, no need for further processing
			return;
		}

		const numbersOnly = inputValue.replace(/\D/g, '');
		otpValues[index] = numbersOnly.substring(0, 1);

		if (index < otpValues.length - 1 && numbersOnly.length > 0) {
			const nextInput = document.querySelector(`#otpInput${index + 1}`);
			if (nextInput) {
				nextInput.focus();
			}
		}
	}

	function handleKeydown(index, event) {
		if (event.key === 'Backspace' && otpValues[index] === '') {
			// If Backspace is pressed and the current input field is empty,
			// move the focus to the previous input field and remove the value.
			event.preventDefault();
			if (index > 0) {
				const prevInput = document.querySelector(`#otpInput${index - 1}`);
				if (prevInput) {
					prevInput.focus();
				}
			}
			otpValues[index - 1] = '';
		} else if (event.key === 'ArrowLeft' && index > 0) {
			// If Arrow Left is pressed and the cursor is not in the first input field,
			// move the focus to the previous input field.
			event.preventDefault();
			const prevInput = document.querySelector(`#otpInput${index - 1}`);
			if (prevInput) {
				prevInput.focus();
			}
		} else if (event.key === 'ArrowRight' && index < otpValues.length - 1) {
			// If Arrow Right is pressed and the cursor is not in the last input field,
			// move the focus to the next input field.
			event.preventDefault();
			const nextInput = document.querySelector(`#otpInput${index + 1}`);
			if (nextInput) {
				nextInput.focus();
			}
		}
	}

	function handlePaste(index, event) {
		event.preventDefault();
		const pastedData = event.clipboardData.getData('text/plain').replace(/\D/g, '');

		for (let i = 0; i < pastedData.length && index + i < otpValues.length; i++) {
			otpValues[index + i] = pastedData.charAt(i);
		}

		if (index + pastedData.length < otpValues.length) {
			const nextInput = document.querySelector(`#otpInput${index + pastedData.length}`);
			if (nextInput) {
				nextInput.focus();
			}
		}
	}
</script>

<div class="w-full">
	<div
		class="w-full flex items-center justify-between pb-[25px] mb-[30px] border-b border-white11 gap-[25px]"
	>
		<div class="relative z-[99] w-full flex flex-col gap-[15px] max-w-[500px] mx-auto">
			<p class="text-base text-black dark:text-white font-medium">Set Login Password</p>
			<div class="w-full grid items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red">
				<input
					type="text"
					class="w-full h-full bg-transparent py-[17px] outline-none text-black dark:text-white pl-[20px]"
				/>
			</div>
			<div class="cursor-pointer mx-auto mt-[15px] w-[178px] py-[13px] rounded-[7px] bg-blue text-white opacity-80 hover:opacity-100 text-center">Confirm</div>
		</div>
	</div>

	<div
		class="w-full flex-col flex items-center justify-between pb-[25px] gap-[25px]"
	>
		<div class="flex flex-col gap-[6px] w-full max-w-[500px] mx-auto">
			<p class="text-sm text-black dark:text-white font-bold">Two-factor Authentication</p>
			<p class="leading-[20px] text-sm text-grayDark font-medium leading-[20px]">
				Download and install Google Authenticator. Enable Two-factor Authentication to protect your
				account from unauthorized access.
			</p>
			<p class="leading-[20px] mt-[20px] text-sm text-grayDark font-medium leading-[20px]">
				Scan the QR code with your Google Authenticator App or enter the secret key manually.
			</p>
		</div>

		<div class="w-full max-w-[142px]">
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
					class="w-full h-full bg-transparent py-[17px] outline-none text-black21 dark:text-white11 pl-[20px]"
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
			<p class="leading-[20px] text-sm text-grayDark font-medium leading-[20px]">
				Write down this code, never reveal it to others. You can use it to regain access to your
				account if there is no access to the authenticator.
			</p>
		</div>

		<div class="flex items-center gap-[8px] ">
			{#each otpValues as value, index}
				<input
					id={`otpInput${index}`}
					bind:value={otpValues[index]}
					on:input={() => handleInput(index)}
					on:keydown={(event) => handleKeydown(index, event)}
					on:paste={(event) => handlePaste(index, event)}
					type="text"
					maxlength="1"
					pattern="[0-9]"
					placeholder=" "
					class="w-[30px] sm:w-[51px] h-[30px] sm:h-[51px] bg-grayLight2 dark:bg-white11 rounded-[10px] sm:rounded-[16px] text-center font-bold dark:text-white text-black leading-[20px] text-sm border-[1px] outline-none placeholder-shown:border-grayLight border-purpleLight dark:placeholder-shown:border-white11"
				/>
			{/each}
		</div>
		<p class="text-sm text-black dark:text-white font-bold">Two-factor Authentication</p>
		<div class="cursor-pointer mx-auto w-[178px] py-[13px] rounded-[7px] bg-blue text-white opacity-80 hover:opacity-100 text-center">Confirm</div>

	</div>
</div>
