<script>
	import { createEventDispatcher } from 'svelte';
	import globalStore from '@store/globalStore';

	export let title;
	export let step;
	export let id;
	export let className = ''

	const dispathEvent = createEventDispatcher();
	function closeProfileModal() {
		if(id) {
			globalStore.toggleItem(id, false)
		}
		dispathEvent('closeProfileModal');
	}

	document.addEventListener('click', (e) => {
		if(e.target.closest('#modalLayout') && !e.target.closest("#modalInner") && !e.target.closest('#closeForm') && !e.target.closest('.radialImg')) {
			dispathEvent('closeProfileModal');
		}
	});

	function stepBack() {
		dispathEvent('stepBack')
	}
</script>

<div
	id="modalLayout"
	class="fixed top-[0px] left-0 w-full h-screen dark:bg-black21 backdrop-blur-[5px] !z-[9999999999] md:z-[9999] overflow-auto"
>

	<div class="w-full h-full flex overflow-auto">
		<div id="modalInner"
			class="{className} relative w-full h-full overflow-auto md:h-auto md:max-w-[460px] m-auto md:min-h-[600px] rounded-[14px] rounded-tl-[14px] bg-white dark:bg-black md:overflow-hidden"
		>
			<img src="/imgs/elipse.svg" class="dark:flex hidden radialImg absolute top-0 right-[0] z-[1]" alt="" />
			<div class="h-full w-full py-[24px]">
				<div class="h-full flex flex-col w-full">
					<div class="w-full flex justify-between px-[26px]">
						<div class="flex items-center gap-[15px]">
							{#if step}
							<svg on:click={stepBack} class="w-[24px] h-[24px] cursor-pointer">
								<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#chevron-left"/>
							</svg>
							{/if}
							<p class="text-xl font-semibold gradient-text-white2 main">{title}</p>
						</div>
						<div
							on:click={closeProfileModal}
							id="closeForm"
							class="relative z-[999] w-[31px] h-[31px] rounded-full flex items-center justify-center bg-grayLight4 dark:bg-white5 cursor-pointer"
						>
							<svg class="w-[16px] h-[16px] translate-x-[1px] translate-y-[1px]">
								<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#close" />
							</svg>
						</div>
					</div>
					<div class="relative z-[9999] flex flex-col h-full w-full px-[26px]">
						<slot />
					</div>

				</div>
			</div>

			<!-- <img class="dark:flex hidden radialImg absolute bottom-0 left-[0] z-[1] rotate-[180deg]"
				src="/imgs/elipse.svg"
				alt=""
			/> -->
		</div>
	</div>
</div>
