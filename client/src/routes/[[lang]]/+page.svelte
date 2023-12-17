<script>
	import Hero from '$lib/components/main/hero/hero.svelte';
	import AllCategory from '$lib/components/main/allCategory/allCategory.svelte';
	import LiveSports from '$lib/components/main/liveSports/liveSports.svelte';
	import MainSports from '$lib/components/main/mainSports/mainSports.svelte';
	import ActivityTable from '$lib/components/main/activityTable/activityTable.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";
	import SliderView from '$lib/components/sliderview/sliderView.svelte';
	
</script>

<main class="w-full md:py-[27px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main">
		<!--Hero-->
		<Hero />
		<div class="px-[15px] py-[30px] sm:px-[30px] md:px-[0px] md:py-[0px]">
			<!-- All Category -->
			<AllCategory />
			<!-- Live Sports -->
			<LiveSports />
			<!-- Main Sports -->
			<MainSports />
			<!-- Best Casino -->
			<SliderView title="Best Casino" type="casino" category="hot" />
			<!-- Best Slot -->
			<SliderView title="Best Slot" type="casino" category="slot" />
			<!-- Recent Bet Deposits & Withdrawal History -->
			<ActivityTable title={$LL.RECENT_BET_DEPOSITS_AND_WITHDRAWAL_HISTORY()} showCols={[1, 1, 1]} />
			<!-- Footer -->
			<Footer />
		</div>
	</div>
</main>
