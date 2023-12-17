<script>
	import { createEventDispatcher } from 'svelte';
	import toast from '@components/toast/toast';
	import globalStore from '@store/globalStore';
	import { forgotPasswordEmail, forgotPasswordChange } from '@apis/account';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";
	
	let forgotUserData = {
    email: "",
    authCode: "",
    password: "",
  };

	$: forgotPasswordStep = $globalStore.forgotPasswordStep;
	const dispatch = createEventDispatcher();

	function openSignIn() {
		globalStore.toggleItem('forgotPasswordStep', 1)
		dispatch('openSignIn');
	}
	
	async function handleForgotPassword(event) {
    event.preventDefault();
    if ($globalStore.forgotPasswordStep == 1) {
      document.getElementById('submit_forgot').disabled = true
      const res = await forgotPasswordEmail({
        email: forgotUserData.email,
      });
      document.getElementById('submit_forgot').disabled = false
      if (res.success) {
        toast.success("Sent a verification code to your email.");
        globalStore.toggleItem("forgotPasswordStep", 2);
      } else {
        toast.error(res.data.message);
      }
    } else if ($globalStore.forgotPasswordStep == 2) {
      const res = await forgotPasswordChange({
        email: forgotUserData.email,
        authCode: forgotUserData.authCode,
        password: forgotUserData.password,
      });
      if (res.success) {
        toast.success(res.data.message);
        globalStore.toggleItem("forgotPasswordStep", 3);
      } else toast.error(res.data.message);
    }
		else {
			dispatch('closeForm');
		}
  }
</script>

<h5 class="text-2xl font-medium text-white">{$LL.FORGOT_PASSWORD()}</h5>
<p class="mb-[25px] text-sm text-grayDark3 mt-[15px]">
	{$LL.ENTER_EMAIL_RESET_PASSWORD()}
</p>
<form class="w-full" on:submit={handleForgotPassword}>
	<div class="flex flex-col w-full gap-[15px]">
		{#if forgotPasswordStep == 1}
		<div class="flex flex-col gap-[9px]">
			<label class="text-msm text-white font-medium" for="email">{$LL.EMAIL_ADDRESS()}</label>
			<div class="w-full flex">
				<input
					type="email"
					id="email"
					class="w-full rounded-[7px] bg-white3 border-2 border-white16 focus:border-white32 !outline-none focus:outline-white p-[11px] text-sm text-white"
					bind:value={forgotUserData.email}
					required
				/>
			</div>
		</div>
		{:else if forgotPasswordStep == 2} 
		<div class="flex flex-col gap-[9px]">
			<label class="text-msm text-white font-medium" for="authCode">{$LL.FIVE_VERIFICATION_CODE()}</label>
			<div class="w-full flex">
				<input
					type="authCode"
					id="authCode"
					class="w-full rounded-[7px] bg-white3 border-2 border-white16 focus:border-white32 !outline-none focus:outline-white p-[11px] text-sm text-white"
					bind:value={forgotUserData.authCode}
					required
				/>
			</div>
		</div>
		<div class="flex flex-col gap-[9px]">
			<label class="text-msm text-white font-medium" for="password">{$LL.PASSWORD()}</label>
			<div class="w-full flex">
				<input
					type="password"
					id="password"
					class="w-full rounded-[7px] bg-white3 border-2 border-white16 focus:border-white32 !outline-none focus:outline-white p-[11px] text-sm text-white"
					bind:value={forgotUserData.password}
					required
				/>
			</div>
		</div>
		{:else if forgotPasswordStep == 3 }
		<div class="flex items-center justify-between mt-[15px] gap-[4px]">
			<p class="text-msm text-grayDark3 font-medium">
				{$LL.SUCCESSFULLY_CHANGED()} <a href="/" on:click={openSignIn} class="gradient-text font-bold"
					>{$LL.SIGN_IN()}</a>
			</p>
		</div>
		{/if}
		<button
			type="submit"
			id="submit_forgot"
			class="w-full bg-linear p-[13px] rounded-[7px] text-sm font-semibold text-white opacity-90 hover:opacity-100 transition-all"
		>
			{$globalStore.forgotPasswordStep == 1
			? $LL.SEND()
			: $globalStore.forgotPasswordStep == 2
			? $LL.VERIFY()
			: $LL.SUBMIT()}
		</button>
	</div>
	
	
</form>
