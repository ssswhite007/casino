<script>
	import { onMount } from 'svelte';
	import { Navigation, Pagination } from 'swiper';

	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	// Category Slider
	let bestSlotSlider;
	const bestSlotSliderArr = [
		{
			title: 'Tiny Gods',
			image: '/imgs/slot1.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot2.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot3.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot4.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot5.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot1.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot3.svg',
			link: '/'
		},
		{
			title: 'Tiny Gods',
			image: '/imgs/slot4.svg',
			link: '/'
		}
	];
	onMount(() => {
		bestSlotSlider = document.getElementById('bestSlotSlider').swiper;
	});
	function bestSlotSliderPrev() {
		bestSlotSlider.slidePrev();
	}
	function bestSlotSliderNext() {
		// swiper.slidePrev();
		bestSlotSlider.slideNext();
	}
</script>

<div class="w-full flex flex-col items-start gap-[15px] mt-[37px]">
	<div class="w-full flex items-center justify-between">
		<h6 class="font-semibold text-xl gradient-text-white2 main">Casino/Slot</h6>
		<div class="flex items-center gap-[11px]">
			<button
				class="bg-grayLight dark:bg-blueDark border border-grayLight4 dark:border-white11 opacity-80 hover:opacity-100 rounded-[11px] w-[36px] h-[36px] flex items-center justify-center"
				id="slidePrev"
				on:click={bestSlotSliderPrev}
			>
				<svg class="w-[24px] h-[24px]">
					<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#chevron-left" />
				</svg>
			</button>
			<button
				class="bg-grayLight dark:bg-blueDark border border-grayLight4 dark:border-white11 opacity-80 hover:opacity-100 rounded-[11px] w-[36px] h-[36px] flex items-center justify-center"
				id="slidePrev"
				on:click={bestSlotSliderNext}
			>
				<svg class="w-[24px] h-[24px] rotate-[180deg]">
					<use class="dark:fill-white fill-black" href="/imgs/icons/icons.svg#chevron-left" />
				</svg>
			</button>
		</div>
	</div>
	<Swiper
		id="bestSlotSlider"
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
		{#each bestSlotSliderArr as categoryItem}
			<SwiperSlide>
				<a
					href={categoryItem.link}
					class="border-b-4 border-b-transparent group flex flex-col bg-white dark:bg-white5 relative w-full rounded-[20px] overflow-hidden hover:border-b-blue transition-all"
				>
					<div class="relative rounded-[20px] overflow-hidden">
						<img class="w-full object-cover transition05" src={categoryItem.image} alt="slot" />
						<div
							class="group-hover:opacity-100 opacity-0 transition-all absolute left-0 top-0 w-full h-full bg-black81 flex items-center justify-center"
						>
							<div
								class="flex flex-col gap-[12px] scale-[0.80] group-hover:scale-[1] transition-all"
							>
								<img src="/imgs/play.svg" alt="play.svg" />
							</div>
						</div>
					</div>
					<div
						class="w-full flex gap-[6px] items-center justify-between px-[13px] pt-[11px] pb-[16px]"
					>
						<p class="text-sm text-grayDark2 font-semibold">
							{categoryItem.title}
						</p>
						<div class="flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md">
							<svg width="12" height="12"
								>
                                <use class="fill-transparent" href="/imgs/icons/icons.svg#star" />

							</svg>
						</div>
						
					</div>
				</a>
			</SwiperSlide>
		{/each}
	</Swiper>
</div>
