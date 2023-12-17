<script>
	import { onMount } from 'svelte';
	import { Navigation, Pagination } from 'swiper';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	import { getCasinoList, getTypes, getVendors } from '@apis/casino';
	import { createFavorite, deleteFavorite } from '@apis/favorite';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import globalStore from '@store/globalStore';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import Skeleton from '../loader/skeleton.svelte';

	import firebase from '@components/firebase/firebase';
	import { signIn, getAccessToken, getRefreshToken, signupSocial } from '@apis/account';
	import toast from '@components/toast/toast';

	import SliderItem from './sliderItem.svelte';

	// Category Slider
	export let title;
	export let type;
	export let category;

	let page = 0;
	let limit = 8;
	let casinoSlider;
	let casinoSliderArr = [];

	onMount(async () => {
		// casinoSlider = document.getElementById('casinoSlider').swiper;
		// await load();
	});

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

	async function onPrevPage() {
		casinoSlider.swiper().slidePrev();
	}

	async function onNextPage() {
		casinoSlider.swiper().slideNext();
	}

	async function load() {
		casinoSliderArr = [];
		if (type == 'casino') {
			const res = await getCasinoList({
				title: '',
				type: category == 'hot' ? '' : category,
				page,
				sort: category == 'hot' ? 'rank' : '',
				// limit: casinoSlider.params.slidesPerView
				limit: 20,
				email: $globalStore.userDetail ? $globalStore.userDetail.email : ''
			});

			casinoSliderArr = res.data.list;
		} else if (type == 'vendors') {
			const res = await getVendors({});

			casinoSliderArr = res.data;
		} else if (type == 'types') {
			const res = await getTypes({});

			casinoSliderArr = res.data;
		} else {
			casinoSliderArr = [];
		}
	}

	let loadedIages = [];
	const handleImageLoad = (id) => {
		loadedIages = [...loadedIages, id];
	};

	let notFoundImages = [];

	const handleImageError = (id, event) => {
		notFoundImages = [...notFoundImages, id];
		event.target.src = '/imgs/no-image.jpg';
	};

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		await provider.addScope('email');
		const data = await firebase.auth().signInWithPopup(provider);
		const userInfo = data.additionalUserInfo.profile;
		const res = await signupSocial({
			email: userInfo.email,
			password: userInfo.id
		});
		try {
			const res1 = await signIn({
				email: userInfo.email,
				password: userInfo.id
			});

			if (res1.success) {
				toast.success($LL[res1.data.key]());
				globalStore.toggleItem('loginForm', false);
				handleTokens();
			} else {
				toast.error($LL[res1.data.key]());
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function handleTokens() {
		const res = await getAccessToken();
		if (res.success) {
			globalStore.toggleItem('userDetail', res.data);
		} else if (res.data.code == 4001) {
			const res1 = await getRefreshToken();
			if (res1.success) {
				const res2 = await getAccessToken();
				if (res2.success) globalStore.toggleItem('userDetail', res2.data);
			} else {
				globalStore.toggleItem('userDetail', null);
			}
		} else {
			globalStore.toggleItem('userDetail', null);
		}
	}
</script>

<div class="w-full flex flex-col items-start gap-[15px] mt-[37px]">
	<div class="w-full flex items-center justify-between">
		<h6 class="font-semibold text-xl gradient-text-white2 main">{title}</h6>
		<div class="flex items-center gap-4">
			{#if type !== 'vendors' && type !== 'types'}
				<a
					href={`/casino/${category}`}
					class="text-sm text-grayLight hover:text-primary transition-all capitalize">View All</a
				>
			{/if}
			<div class="flex items-center gap-[11px]">
				<button
					class="bg-grayLight dark:bg-blueDark border border-grayLight4 dark:border-white11 opacity-80 hover:opacity-100 rounded-[11px] w-[36px] h-[36px] flex items-center justify-center"
					id="slidePrev"
					on:click={onPrevPage}
				>
					<svg class="w-[24px] h-[24px]">
						<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#chevron-left" />
					</svg>
				</button>
				<button
					class="bg-grayLight dark:bg-blueDark border border-grayLight4 dark:border-white11 opacity-80 hover:opacity-100 rounded-[11px] w-[36px] h-[36px] flex items-center justify-center"
					id="slidePrev"
					on:click={onNextPage}
				>
					<svg class="w-[24px] h-[24px] rotate-[180deg]">
						<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#chevron-left" />
					</svg>
				</button>
			</div>
		</div>
	</div>
	<Swiper
		id="casinoSlider"
		bind:this={casinoSlider}
		class="w-full"
		spaceBetween={15}
		slidesPerView={2}
		modules={[Pagination]}
		breakpoints={{
			0: {
				slidesPerView: 2
			},
			640: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4
			},
			1024: {
				slidesPerView: 5
			},
			1440: {
				slidesPerView: 6
			}
		}}
	>
		{#if type !== 'vendors' && type !== 'types'}
			{#if casinoSliderArr.length > 0}
				{#each casinoSliderArr as categoryItem}
					<SwiperSlide>
						<!-- {#if !loadedIages.includes(categoryItem.id)}
							<Skeleton cardCount={1} />
						{/if}
						<div class="{!loadedIages.includes(categoryItem.id) ? 'hidden' : ''}">
							<a
								class="slider-main border-b-4 border-b-transparent group flex flex-col bg-white dark:bg-white5 relative w-full rounded-[20px] overflow-hidden hover:border-b-blue transition-all"
							>
								<div class="relative main rounded-[20px] overflow-hidden">
									<img
										on:load={handleImageLoad(categoryItem.id)}
										on:error={(event) => handleImageError(categoryItem.id, event)}
										class="image w-full object-cover transition05"
										src={categoryItem.thumbnail}
										alt="slot"
									/>
	
									<div
										class="group-hover:opacity-100 opacity-0 transition-all absolute left-0 top-0 w-full h-full bg-black81 flex items-center justify-center"
									>
										<div
											class="group-hover:opacity-100 opacity-0 transition-all absolute left-0 top-0 w-full h-full bg-black81 flex items-center justify-center"
										>
											<a
												href="/play/{categoryItem.title
													.toLowerCase()
													.replaceAll(' ', '-')}/{categoryItem._id}"
												class="flex flex-col gap-[12px] scale-[0.80] group-hover:scale-[1] transition-all"
											>
												<img src="/imgs/play.svg" alt="play.svg" />
											</a>
										</div>
									</div>
								</div>
								<div
									class="w-full flex gap-[6px] items-center justify-between px-[13px] pt-[11px] pb-[16px]"
								>
									<p
										class="text-sm text-grayDark2 font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
									>
										{categoryItem.title}
									</p>
									<div
										class="cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md"
										on:click={async () => {
											if ($globalStore.userDetail == null) {
												await signInWithGoogle();
												return;
											} else if (categoryItem.favorites == false) {
												const res = await createFavorite({
													email: $globalStore.userDetail.email,
													gameId: categoryItem.id,
													type
												});
												if (res.success) categoryItem.favorites = true;
											} else {
												const res = await deleteFavorite({
													email: $globalStore.userDetail.email,
													gameId: categoryItem.id,
													type
												});
	
												if (res.success) categoryItem.favorites = false;
											}
										}}
									>
										<svg width="12" height="12">
											<use
												class={`${categoryItem.favorites ? 'fill-yellow' : 'fill-gray'}`}
												href="/imgs/icons/icons.svg#star"
											/>
										</svg>
									</div>
								</div></a
							>
						</div> -->
						<SliderItem item={categoryItem} load={false} type={type}/>
					</SwiperSlide>
				{/each}
			{/if}
		{:else if type == 'vendors'}
			{#each casinoSliderArr as categoryItem}
				<SwiperSlide>
					<!-- <a
						class="slider-main border-b-4 border-b-transparent px-2 group flex bg-white dark:bg-white5 relative w-full rounded-[20px] items-center gap-2 py-2 overflow-hidden hover:border-b-blue transition-all cursor-pointer"
					>
						<div class="relative main flex items-center justify-center rounded-[20px] mt-1">
							<img
								class="min-w-[41px] w-[41px] transition05"
								src={categoryItem.thumbnail}
								alt="slot"
							/>
						</div>
						<p
							class="text-sm text-grayDark2 font-semibold text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer "
						>
							{categoryItem.title}
						</p>
					</a> -->

					<a
						class="slider-main border-b-4 border-b-transparent px-2 group flex bg-white dark:bg-white5 relative w-full rounded-[20px] items-center gap-2 py-[18px] overflow-hidden hover:border-b-blue transition-all cursor-pointer"
					>
						<p
							class="text-sm text-grayDark2 mt-1 text-center w-full font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
						>
							{categoryItem.title}
						</p>
					</a></SwiperSlide
				>
			{/each}
		{:else if type == 'types'}
			{#each casinoSliderArr as categoryItem}
				<SwiperSlide>
					<a
						class="slider-main border-b-4 border-b-transparent px-2 group flex bg-white dark:bg-white5 relative w-full rounded-[20px] items-center gap-2 py-[18px] overflow-hidden hover:border-b-blue transition-all cursor-pointer"
					>
						<p
							class="text-sm text-grayDark2 mt-1 text-center w-full font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
						>
							{categoryItem.title}
						</p>
					</a>
				</SwiperSlide>
			{/each}
		{/if}
	</Swiper>
</div>
