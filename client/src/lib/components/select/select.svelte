<script>
	import { writable } from 'svelte/store';
	import Select from 'svelte-select';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	export let items; // select array
	export let classname = '';
	export let textClassname = '';
	export let selectedIndex;
	export let searchable = false;
	export let imagePrepend = true;
	export let balance = '';
	let selectedValue;
	if (selectedIndex) {
		selectedValue = writable(items[selectedIndex].value);
	} else {
		selectedValue = writable(items[0].value);
	}

	function handleChange(item) {
		selectedValue.set(item);
		const selectElement = document.querySelectorAll('.svelte-select input');
		if (selectElement) {
			selectElement.forEach((select) => {
				select.blur();
			});
		}
		dispatch('handleChange', item.label);
	}
</script>

<Select
	class="{classname} svelte-cr relative z-[99] max !max-w-full !rounded-[7px] !w-full !gap-[17px] !bg-grayLight4 dark:!bg-white5 !backdrop-blur-[8px] !border !border-transparent !py-[6px]"
	{items}
	clearable={false}
	showChevron
	{searchable}
	bind:value={$selectedValue}
>
	<div slot="selection" let:selection>
		<div class="flex items-center gap-[12px]">
			{#if selection.image && imagePrepend}
				<div class="w-[30px] h-[30px]">
					<img src={selection.image} alt={selection.label} />
				</div>
			{/if}
			<p class="text-base {textClassname} text-black dark:text-white font-medium">
				{selection.label}
			</p>
			{#if selection.image && !imagePrepend}
				<div class="w-[30px] h-[30px]">
					<img src={selection.image} alt={selection.label} />
				</div>
			{/if}

			{#if balance}
			<p class="ml-auto text-white font-medium text-base dark:text-white">
				<span class="text-gray">Balance:</span>
				{balance}
			</p>
		{/if}
		</div>
	</div>

	<div slot="chevron-icon">
		<svg class="w-[20px] h-[20px]">
			<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#chevron-down" />
		</svg>
	</div>
	<div slot="list" let:filteredItems class="bg-grayLight4 dark:bg-blackLight">
		{#each filteredItems as items}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class={`${
					$selectedValue.value === items.value ? 'bg-blue select-selected !opacity-100' : ''
				} cursor-pointer flex items-center gap-[6px] px-[15px] py-[12px]  hover:bg-blue hover:opacity-80`}
				on:click={handleChange(items)}
			>
				{#if items.labelHTML}
					<div class="w-full">{@html items.labelHTML}</div>
				{:else}
					{#if items.image}
						<div class="w-[30px] h-[30px]">
							<img src={items.image} alt={items.label} />
						</div>
					{/if}
					{#if items.label}
						<p class="text-sm text-black dark:text-white font-medium">{items.label}</p>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
</Select>

<style>
	:global(.svelte-cr .prepend) {
		position: absolute;
	}
	:global(.svelte-cr.focused) {
		border-color: theme('colors.blue') !important;
		z-index: 999 !important;
	}
	:global(.svelte-cr .svelte-select-list) {
		border: none;
		background: transparent !important;
	}
</style>
