<script>
	import { onMount } from 'svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import { getCasinoList } from '@apis/casino';
	import Skeleton from '$lib/components/loader/skeleton.svelte';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import globalStore from '@store/globalStore';
	import BreadCrumb from '$lib/components/breadCrumb/breadCrumb.svelte';

	import CasinoItem from '$lib/components/casino/item.svelte';
	export let data;

	let totalNumber = 0,
		casinoList = [],
		currentLimit = 0;

	let isLoad = '';
	
	$: {
		if ($globalStore.userDetail && $globalStore.userDetail != isLoad) {
			isLoad = $globalStore.userDetail;
			load();
		} else if(!$globalStore.userDetail && $globalStore.userDetail != isLoad) {
			isLoad = $globalStore.userDetail;
			load();
		}
	}

	let searchKey = '',
		pageIndex = 0,
		inputFocus = false;

	let slotsLoaded = false;

	onMount(async () => {
		const container = document.querySelectorAll('.dragable');
		container.forEach((cont) => {
			let startY;
			let startX;
			let scrollLeft;
			let scrollTop;
			let isDown;

			cont.addEventListener('mousedown', (e) => {
				isDown = true;
				startY = e.pageY - cont.offsetTop;
				startX = e.pageX - cont.offsetLeft;
				scrollLeft = cont.scrollLeft;
				scrollTop = cont.scrollTop;
			});
			cont.addEventListener('mouseup', (e) => {
				isDown = false;
			});
			cont.addEventListener('mouseleave', (e) => {
				isDown = false;
			});
			cont.addEventListener('mousemove', (e) => {
				if (isDown) {
					e.preventDefault();

					//Move Horizontally
					const x = e.pageX - cont.offsetLeft;
					const walkX = x - startX;
					cont.scrollLeft = scrollLeft - walkX;
				}
			});
		});
	});

	const load = async () => {
		casinoList = [];
		slotsLoaded = false;
		const res = await getCasinoList({
			title: '',
			type: data.type == 'hot' ? '' : data.type,
			page: 0,
			sort: data.type == 'hot' ? 'rank' : '',
			limit: 40,
			email: $globalStore.userDetail ? $globalStore.userDetail.email : ''
		});

		totalNumber = res.data.totalNumber;
		casinoList = res.data.list;
		currentLimit = casinoList.length;
		slotsLoaded = true;
	};

	const search = async () => {
		let filterTitle = searchKey;

		if (searchKey.length < 3) {
			filterTitle = '';
		}

		casinoList = [];
		slotsLoaded = false;

		pageIndex = 0;
		currentLimit = 0;
		const res = await getCasinoList({
			title: filterTitle,
			type: data.type == 'hot' ? '' : data.type,
			page: pageIndex,
			sort: data.type == 'hot' ? 'rank' : '',
			limit: 40,
			email: $globalStore.userDetail ? $globalStore.userDetail.email : ''
		});
		totalNumber = res.data.totalNumber;
		casinoList = res.data.list;
		currentLimit = casinoList.length;
		slotsLoaded = true;
	};

	const moreLoad = async () => {
		pageIndex++;
		slotsLoaded = false;
		const res = await getCasinoList({
			title: searchKey,
			type: data.type == 'hot' ? '' : data.type,
			page: pageIndex,
			sort: data.type == 'hot' ? 'rank' : '',
			limit: 40,
			email: $globalStore.userDetail ? $globalStore.userDetail.email : ''
		});
		currentLimit += res.data.list.length;
		casinoList = [...casinoList, ...res.data.list];
		slotsLoaded = true;
	};

	const breadCrumbPages = [
		{
			name: 'casino',
			route: '/casino'
		}
	];
</script>

<main class="w-full py-[27px] pl-[15px] pr-[15px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main">
		<div class="grid grid-cols-[auto] gap-[4px] rounded-[7px] overflow-hidden h-[50px]">
			<div
				class="{(inputFocus || searchKey.length > 0) && searchKey.length < 3
					? 'border-red '
					: 'border-transparent'} w-full grid grid-cols-[auto,50px] items-center bg-white dark:bg-white5 rounded-[7px] border"
			>
				<input
					class="w-full h-full bg-transparent outline-none px-[23px] text-sm font-medium font-normal text-black dark:text-grayLight placeholder:text-grayDark4"
					type="text"
					bind:value={searchKey}
					placeholder="Seach here..."
					on:input={search}
					on:focus={() => (inputFocus = true)}
					on:focusout={() => (inputFocus = false)}
				/>
				<div
					class="opacity-80 hover:opacity-100 flex h-[calc(100%-20px)] justify-center items-center cursor-pointer border-l border-grayDark40"
				>
					<svg class="w-[20px] h-[20px]">
						<use class="fill-grayDark" href="/imgs/icons/icons.svg#search" />
					</svg>
				</div>
			</div>
		</div>

		{#if (inputFocus || searchKey.length > 0) && searchKey.length < 3}
			<p class="text-red mt-1">Search require at least 3 Characters</p>
		{/if}

		<div class="pl-[15px] pr-[15px] md:pl-[0px] md:pr-[0px] mt-[15px]">
			<BreadCrumb pages={breadCrumbPages} current={data.type} />
		</div>

		{#if casinoList.length > 0}
			<div class="grid grid-system-slots w-full gap-[20px] mt-[20px]">
				{#each casinoList as item}
					<!-- <a
						class="border-b-4 border-b-transparent group flex flex-col bg-white dark:bg-white5 relative w-full rounded-[20px] overflow-hidden hover:border-b-blue transition-all"
					>
						<div class="relative rounded-[20px] overflow-hidden">
							<img
								class="w-full h-[150px] sm:h-[180px] object-cover transition05"
								src={item.thumbnail}
								on:error={(event) => (event.target.src = '/imgs/no-image.jpg')}
								alt={item.title}
							/>
							<div
								class="group-hover:opacity-100 opacity-0 transition-all absolute left-0 top-0 w-full h-full bg-black81 flex items-center justify-center"
							>
								<a
									href="/play/{item.title.toLowerCase().replaceAll(' ', '-')}/{item._id}"
									class="flex flex-col gap-[12px] scale-[0.80] group-hover:scale-[1] transition-all"
								>
									<img src="/imgs/play.svg" alt="play.svg" />
								</a>
							</div>
						</div>
						<div
							class="w-full flex gap-[6px] items-center justify-between px-[13px] pt-[11px] pb-[8px]"
						>
							<p
								class="text-sm text-grayDark2 font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
							>
								{item.title}
							</p>
							<div
								class="flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md"
							>
								<svg width="12" height="12">
									<use class="fill-gray" href="/imgs/icons/icons.svg#star" />
								</svg>
							</div>
						</div>
					</a> -->
					<CasinoItem {item} load={false} />
				{/each}

				{#if !slotsLoaded}
					<Skeleton cardCount={40} />
				{/if}
			</div>

			{#if slotsLoaded}
				<div class="w-full justify-center flex flex-col items-center gap-[12px] mt-[32px]">
					<p class="text-base font-medium text-black dark:text-white">
						{currentLimit} / {totalNumber}
					</p>
					<button
						class="p-[12px] bg-linear text-white rounded-[6px] border border-white11"
						disabled={currentLimit == totalNumber}
						on:click={moreLoad}>{$LL.LOAD_MORE()}</button
					>
				</div>
			{/if}
		{:else}
			<div class="w-full flex flex-col gap-[25px] justify-center items-center mt-[141px]">
				<img src="/imgs/not-found.svg" class="w-full max-w-[204px]" alt="" />
				<p class="text-white32 font-medium">No Search Result found</p>
			</div>
		{/if}

		<Footer banner={false} />
	</div>
</main>
