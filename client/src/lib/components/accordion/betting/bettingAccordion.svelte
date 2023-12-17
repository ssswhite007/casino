<script>
	import { onMount } from "svelte";
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';
	
	export let title;
    function toggleAccordion(e) {
		let target = e.target.closest('.accordion');
		let accordionTab = target.closest('.accordion-parent').querySelector('.accordion-tab');
		if (accordionTab.classList.contains('h-[0px]')) {
			accordionTab.classList.remove('h-[0px]');
			accordionTab.classList.remove('opacity-0');
			accordionTab.classList.add(`h-[${accordionTab.scrollHeight + 50}px]`);
			accordionTab.classList.add('opacity-100');
			accordionTab.classList.add('mt-[20px]');
			accordionTab.classList.add('py-[25px]');
		} else {
			accordionTab.classList.add('h-[0px]');
			accordionTab.classList.add('opacity-0');
			accordionTab.classList.remove('py-[25px]');

			accordionTab.classList.remove(`h-[${accordionTab.scrollHeight + 50}px]`);
			accordionTab.classList.remove('opacity-100');
			accordionTab.classList.remove('mt-[20px]');
		}
    }
</script>

<div class="accordion-parent relative w-full flex flex-col rounded-[7px] transition-all">
	<div
		on:click={(e) => toggleAccordion(e)}
		class="accordion border-b pb-[6px] border-grayLight2 dark:border-white5 w-full flex items-center justify-between cursor-pointer"
	>
		<p class="font-medium text-base md:text-md text-black dark:text-white">{title}</p>
		<div
			class="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[7px] bg-white dark:bg-white5 opacity-80 hover:opacity-100"
		>
			<svg class="w-[24px] h-[24px]">
				<use
					class="dark:fill-white fill-black"
					href="/imgs/icons/icons.svg#chevron-down"
				/>
			</svg>
			<p class="text-black dark:text-white font-medium text-sm translate-y-[1px]">{$LL.SHOW()}</p>
		</div>
	</div>
	<div
		class="accordion-tab rounded-[7px] bg-white dark:bg-white5 px-[25px] opacity-1 mt-[20px] py-[25px] overflow-hidden transition-all"
	>
		<slot />
	</div>
</div>
