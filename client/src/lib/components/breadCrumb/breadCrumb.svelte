<script>
	export let pages;
	export let current;
	export let hide;
</script>

<div class={`${hide === 'tablet' ? 'md:flex hidden' : 'flex'} w-full text-white`}>
	<div class="w-full flex items-center">
		{#each pages as page}
			<a href={page.route} class="group bg-white dark:bg-white5 px-[25px] py-[12px] mr-[10px] rounded-[7px]">
				<p class="text-sm font-medium text-black50 dark:text-white50 capitalize group-hover:text-black dark:group-hover:text-white">{page.name}</p>
			</a>
			<svg
				class="mr-[10px]"
				width="17"
				height="17"
				viewBox="0 0 17 17"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6.70736 3.87435C6.91482 3.66688 7.25119 3.66688 7.45866 3.87435L11.7087 8.12435C11.9161 8.33182 11.9161 8.66818 11.7087 8.87565L7.45866 13.1257C7.25119 13.3331 6.91482 13.3331 6.70736 13.1257C6.49989 12.9182 6.49989 12.5818 6.70736 12.3743L10.5817 8.5L6.70736 4.62565C6.49989 4.41818 6.49989 4.08182 6.70736 3.87435Z"
					fill="#8D8E95"
				/>
			</svg>
		{/each}
        <p class="text-sm font-medium text-black dark:text-white">{current}</p>
	</div>
</div>
