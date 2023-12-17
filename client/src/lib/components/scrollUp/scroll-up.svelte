<script>
	import { onMount } from 'svelte';

	let show = false;
	onMount(() => {
		if (window.scrollY > 150) {
			show = true;
		} else {
			show = false;
		}
        window.addEventListener('scroll', (e) => {
		if (window.scrollY > 150) {
			show = true;
		} else {
			show = false;
		}
	});
	});

    function scrollTop() {
        window.scrollTo(0, 0)
    }
	
</script>

<div on:click={scrollTop}
		class={`${show ? 'right-[25px]' : 'right-[-300px] opacity-0'} fixed bottom-[85px] z-[9999999] opacity-80 hover:opacity-100 transition-all cursor-pointer`}
	>
		<div class="p-[8px] rounded-[5px] rotate-[45deg] bg-linear">
			<svg class="w-[23px] h-[23px] rotate-[-45deg]">
				<use class="fill-transparent" href="/imgs/icons/icons.svg#arrow-up" />
			</svg>
		</div>
	</div>

