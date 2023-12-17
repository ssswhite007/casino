
<script>
	// Props
	export let filters
	export let active
    export let onFilter = (activeValue) => {return activeValue}
	// Components
    import Btn from "../btn.svelte"
	let activeFilter = active;
	const handleFilter = (val) => {
		if (val) activeFilter = val;
        onFilter(activeFilter)
		return true;
	};
</script>

<div class="relative z-[99] w-full flex items-center gap-4 p-[5px] bg-white5 rounded-[12px]">
	{#each filters as filter}
		<Btn
			onClick={handleFilter}
			label={filter.label}
			value={filter.value}
			radioGroup="withdrawTabs"
			variant="radio"
			className="w-full !bg-transparent {activeFilter === filter.value ? 'active' : ''} filter-btn"
		/>
	{/each}
</div>
