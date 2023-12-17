<script>
	import globalStore from '@store/globalStore';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";

	function openSignUpForm() {
		globalStore.toggleItem('loginForm', false);
		globalStore.toggleItem('forgotPasswordForm', false);
		globalStore.toggleItem('registrationForm', true);

		document.body.style.overflow = 'hidden';
	}
	function openSignInForm() {
		globalStore.toggleItem('registrationForm', false);
		globalStore.toggleItem('forgotPasswordForm', false);
		globalStore.toggleItem('loginForm', true);

		document.body.style.overflow = 'hidden';
	}
</script>

<div class="flex items-center gap-[30px]">
	<div class="flex items-center gap-[15px]">
		<button
			on:click={openSignInForm}
			class="group flex items-center px-[34px] py-[15px] rounded-[7px] hover:bg-linear transition-all"
		>
			<p class="group-hover:text-white text-base font-medium text-grayDark transition-all">
				{$LL.SIGN_IN()}
			</p>
		</button>
		<button
			on:click={openSignUpForm}
			class="group flex items-center px-[34px] py-[15px] rounded-[7px] hover:bg-linear transition-all"
		>
			<p class="group-hover:text-white text-base font-medium text-grayDark transition-all">
				{$LL.SIGN_UP()}
			</p>
		</button>
	</div>
</div>
