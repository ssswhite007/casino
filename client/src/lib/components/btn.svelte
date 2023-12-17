<script>
	import globalStore from '@store/globalStore';

	// Types

	// Props
	export let variant = 'default';
	export let label = undefined;
	export let type = 'button';
	export let additionalLabel = undefined; // in case variant === 'default'
	export let icon = undefined;
	export let iconPrepend = undefined;
	export let iconWidth = 24;
	export let iconHeight = 24;
	export let dropdown = false; // in case variant variant !== 'info'
	export let dropdownIsActive = false;

	export let checked = undefined; // in case variant === 'radio'
	export let radioGroup = undefined; // in case variant === 'radio'
	export let value = undefined; // // in case variant === 'radio'

	export let className = ''; // for background color
	export let infoLabel = '0'; // in case variant === 'info'

	export let onClick = (val) => {
		return val;
	};
	$: sidebarOpen = $globalStore.sidebar;

	const handleClick = (e) => {
		if (dropdown && onClick) {
			onClick(!dropdownIsActive);
		} else if (variant === 'radio' && onClick) {
			onClick(e.target.value);
		} else if (onClick) {
			onClick(true);
		}
	};
</script>

{#if variant === 'radio'}
	<button
		on:click={handleClick}
		class="bg-white5 hover:opacity-80 active:scale-x-[0.98] transition-all relative flex items-center gap-[9px] rounded-[9px] px-[18px] py-[12px] {className}"
	>
		{#if icon}
			<img src={icon} alt="" class="w-full max-w-[25px]" />
		{/if}
		<p class="text font-main_medium text-sm text-white mt-1">{label}</p>

		<input
			type="radio"
			checked={checked ? true : false}
			name={radioGroup}
			{value}
			id=""
			class="peer opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
		/>
		<div
			class="radio-circle ml-auto w-[22px] h-[22px] rounded-full border-[1px] border-white peer-checked:border-[6px] peer-checked:border-primary peer-checked:bg-white transition-all"
		/>
	</button>
{:else if variant === 'select'}
	<button
		on:click={handleClick}
		class="w-full bg-white5 hover:opacity-80 active:scale-x-[0.98] transition-all relative flex items-center gap-[5px] rounded-[9px] px-[18px] py-[12px] {className}"
	>
		{#if sidebarOpen}
			<div>
				<!-- <img class="w-[22px] flex dark:hidden" src="/imgs/global.svg" alt="global" /> -->
				<img class="w-[22px]" src="/imgs/globalLight.svg" alt="global" />
			</div>
		{/if}
		<p class="text font-main_medium text-sm text-white mt-1">{label}</p>

		<svg
			class="w-[18px] h-[18px] ml-auto {dropdownIsActive ? '' : 'rotate-[180deg]'} transition-all"
		>
			<use class="dark:fill-white fill-white" href="/imgs/icons/icons.svg#chevron-down" />
		</svg>
	</button>
{/if}
