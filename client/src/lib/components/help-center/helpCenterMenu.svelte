<script>
	import { createEventDispatcher } from 'svelte';
	import Select from '../select/select.svelte';

	export let selectedIndex;
	export let activeTab;
	let tab = activeTab;

	const dispatchEvent = createEventDispatcher();

	function handleTab(target) {
		tab = target;
		dispatchEvent('handleTab', tab);
	}

	const tabs = [
		{
			label: 'provably fair',
			value: 'provably fair'
		},
		{
			label: 'terms of services',
			value: 'terms of services'
		},
		{
			label: 'terms of sports',
			value: 'terms of sports'
		},
		{
			label: 'deposit bonus terms',
			value: 'deposit bonus terms'
		},
		{
			label: 'coin accuracy limit',
			value: 'coin accuracy limit'
		},
		{
			label: 'support',
			value: 'support'
		},
		{
			label: 'fee',
			value: 'fee'
		},
		{
			label: 'google authenticator',
			value: 'google authenticator'
		},
		{
			label: 'faq',
			value: 'faq'
		},
		{
			label: 'cryptocurency',
			value: 'cryptocurency'
		},
		{
			label: 'registration and login',
			value: 'registration and login'
		},
		{
			label: 'GFSwap Policy',
			value: 'GFSwap Policy'
		},
		{
			label: 'Gamble aware',
			value: 'Gamble aware'
		},
		{
			label: 'protecting minors',
			value: 'protecting minors'
		},
		{
			label: 'providers',
			value: 'providers'
		},
		{
			label: 'aml',
			value: 'aml'
		},
		{
			label: 'self-exclusion',
			value: 'self-exclusion'
		},
		{
			label: 'responsible gambling',
			value: 'responsible gambling'
		}
	];

	function handleChange(label) {
		tab = label.detail
		dispatchEvent('handleChange', label.detail)
	}
</script>

<div class="relative w-full">
	<div class="flex md:hidden w-full">
		<Select items={tabs} selectedIndex={selectedIndex} on:handleChange={handleChange} />
	</div>
	<ul class="hidden md:flex w-full flex-col gap-[5px]">
		{#each tabs as tabItem, index}
			<li>
				<a
					href="#"
					on:click={() => handleTab(tabItem.label)}
					class={`${
						tab === tabItem.label
							? 'bg-white dark:bg-white5 border-grayLight2 dark:border-white11 text-purpleLight'
							: 'border-transparent text-black dark:text-white'
					}  active:scale-[0.95] capitalize transition-all flex px-[18px] py-[13px] border hover:bg-white dark:hover:bg-white5  hover:border-grayLight2 dark:hover:border-white11 rounded-[7px] `}
					>{tabItem.label}</a
				>
			</li>
		{/each}
	</ul>
</div>
