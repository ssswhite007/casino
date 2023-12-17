<script>
	import { onMount } from 'svelte';

	export let question;
	export let answer;
	function toggleAccordion(e) {
		let target = e.target.closest('.accordion');
		let accordionTab = target.closest('.accordion-parent').querySelector('.accordion-tab');
		if (accordionTab.classList.contains('h-[0px]')) {
			accordionTab.classList.remove('h-[0px]');
			accordionTab.classList.remove('opacity-0');
			accordionTab.classList.add(`h-[${accordionTab.scrollHeight}px]`);
			accordionTab.classList.add('opacity-100');
			accordionTab.classList.add('mt-[20px]');
		} else {
			accordionTab.classList.add('h-[0px]');
			accordionTab.classList.add('opacity-0');
			accordionTab.classList.remove(`h-[${accordionTab.scrollHeight}px]`);
			accordionTab.classList.remove('opacity-100');
            accordionTab.classList.remove('mt-[20px]');
		}
	}
</script>

<div
	class="accordion-parent relative w-full flex flex-col bg-grayLight bg-white dark:bg-white5 rounded-[7px] transition-all"
>
	<div
		on:click={(e) => toggleAccordion(e)}
		class="accordion pt-[20px] px-[25px] w-full flex items-center justify-between cursor-pointer"
	>
		<p class="font-medium text-sm text-black dark:text-white">{question}</p>
		<svg class="w-[24px] h-[24px]">
			<use
				class="dark:fill-white fill-black"
				href="/imgs/icons/icons.svg#chevron-down"
			/>
		</svg>
	</div>
	<div
		class="accordion-tab max-w-[918px] pb-[20px] px-[25px] h-[0px] opacity-0 overflow-hidden transition-all"
	>
		<p class="font-medium text-sm text-black50 dark:text-white50">{answer}</p>
	</div>
</div>
