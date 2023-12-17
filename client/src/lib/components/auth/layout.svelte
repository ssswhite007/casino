<script>
	import { createEventDispatcher } from 'svelte';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";

	const dispatch = createEventDispatcher();

	function closeForm(e) {
		if (!e.target.closest('#formLayout')) {
			dispatch('closeForm');
		} else if (e.target.closest('#formLayout') && e.target.closest('#closeForm')) {
			dispatch('closeForm');
		}
	}
</script>

<div
	on:click={closeForm}
	class="fixed top-0 left-0 w-full h-screen bg-black21 backdrop-blur-[5px] z-[9999999999] md:z-[9999]"
>
	<div class="w-full h-full flex overflow-auto md:pt-[50px]">
		<div
			id="formLayout"
			class="relative w-full max-w-[780px] grid md:grid-cols-2 h-full md:h-auto m-auto min-h-[600px] rounded-[14px] rounded-tl-[14px] bg-black overflow-hidden"
		>
		<img class="absolute left-0 top-0 w-full h-full object-cover flex md:hidden" src="/imgs/authBg.svg" alt="">

			<div class="hidden md:flex relative w-full rounded-r-[14px] px-[26px] overflow-hidden">
				<img
					class="absolute left-0 top-0 w-full h-full object-cover"
					src="/imgs/authImage.svg"
					alt=""
				/>
				<div class="relative w-full py-[17px] flex flex-col gap-[46px]">
					<img class="w-full max-w-[31px]" src="/imgs/logo-white.svg" alt="logo-white" />
					<div class="flex flex-col gap-[18px]">
						<h6 class="text-xl text-white font-medium">{$LL.MADE_FOR_PROFESSIONAL_GAMBLERS()}</h6>
						<p class="text-sm text-white50 font-medium">
							Lorem ipsum dolor sit amet consectetur. eget tortor egestas.
						</p>
					</div>
				</div>
			</div>
			
			<div class="relative z-[9] w-full py-[15px]">
				<div class="flex flex-col w-full">
					<div class="w-full flex justify-between md:justify-end px-[25px] mb-[55px] md:mb-[0px]">
						<a href="/" on:click={() => dispatch('closeForm')} class="w-full max-w-[231px] md:hidden flex">
							<img src="/imgs/LogoWithTitle.svg" alt="">
						</a>
						<div
							id="closeForm"
							class="w-[31px] h-[31px] rounded-full flex items-center justify-center bg-white5 cursor-pointer"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.25885 2.19803C2.96595 1.90514 2.49108 1.90514 2.19819 2.19803C1.90529 2.49093 1.90529 2.9658 2.19819 3.25869L6.43745 7.49796L2.51686 11.4185C2.22397 11.7114 2.22397 12.1863 2.51686 12.4792C2.80976 12.7721 3.28463 12.7721 3.57752 12.4792L7.49811 8.55862L11.7366 12.7972C12.0295 13.09 12.5044 13.09 12.7973 12.7972C13.0902 12.5043 13.0902 12.0294 12.7973 11.7365L8.55877 7.49796L12.798 3.25869C13.0909 2.9658 13.0909 2.49093 12.798 2.19803C12.5051 1.90514 12.0303 1.90514 11.7374 2.19803L7.49811 6.4373L3.25885 2.19803Z"
									fill="#94959B"
								/>
							</svg>
						</div>
					</div>
					<div class="w-full px-[25px] md:px-[42px]">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
