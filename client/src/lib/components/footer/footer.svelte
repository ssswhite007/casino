<script>
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	export let banner = true;
</script>

<div class="w-full mt-[64px] flex flex-col gap-[80px] items-center">
	{#if banner}
		<div class="relative w-full hidden md:flex">
			<img
				class="w-full min-h-[260px] max-h-[320px] object-cover rounded-[14px]"
				src="/imgs/footerBanner.svg"
				alt=""
			/>
			<div class="absolute left-0 top-0 w-full h-full bg-black21 rounded-[33px]" />
			<div class="absolute right-[51px] top-[50%] translate-y-[-50%]">
				<img
					class="h-[350px]"
					src="/imgs/footerBannerIllustration.svg"
					alt="illustration"
				/>
			</div>
			<div class="absolute left-[47px] top-[50%] translate-y-[-50%]">
				<div class="flex flex-col w-full max-w-[293px]">
					<p class="text-xs text-purpleLight font-medium uppercase">{$LL.SIGN_UP_GET_DEPOSIT_BONUS()}</p>
					<h4 class="text-3xl text-white font-semibold">{$LL.UP_TO_300()}</h4>
					<p class="text-xs text-purpleLight font-medium uppercase">
						{$LL.WWW()}
					</p>
					<button
						class="px-[26px] py-[16px] font-semibold text-msm bg-white9 text-white mt-[18px] border border-white9 rounded-[9px] opacity-80 hover:opacity-100 transition-all max-w-max"
						>{$LL.GET_STARTED()}</button
					>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-col items-center max-w-[850px]">
		<p class="text-center text-sm sm:text-base font-medium text-black dark:text-white">
			{$LL.FOOTER_DETAIL1()}
		</p>
		<p class="text-center text-sm sm:text-base font-medium text-grayDark2 mt-[28px] mb-[64px]">
			{$LL.FOOTER_DETAIL2()}
		</p>
		<a href="/" class="flex">
			<img class="w-full max-w-[50px]" src="/imgs/Logo.svg" alt="" />
		</a>
	</div>
</div>
