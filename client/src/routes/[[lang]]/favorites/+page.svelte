<script>
	import globalStore from '@store/globalStore';
	import BreadCrumb from '$lib/components/breadCrumb/breadCrumb.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import CasinoSlot from '@components/favortes/casino-slot.svelte';
	import MiniGames from '@components/favortes/miniGames.svelte';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	const breadCrumbPages = [
		{
			name: 'casino',
			route: '/casino'
		}
	];
	const title = 'Favorites';
</script>

<main class="w-full py-[27px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main-sm">
		<div class="pl-[15px] pr-[15px] md:pl-[0px] md:pr-[0px]">
			<BreadCrumb pages={breadCrumbPages} current={title} />
		</div>

		<div class="pl-[15px] pr-[15px] md:pl-[0px] md:pr-[0px]">
			<div class="w-full flex items-center justify-center py-10">
				<div class="flex flex-col items-center">
					<img class="w-[167px]" src="/imgs/nofav.svg" />
					<p class="text-black text-2xl text-black dark:text-white">{$LL.NO_FAVORITES_YET()}</p>
					<div class="flex  flex-col md:flex-row gap-2 text-lg text-gray font-semibold items-center">

						<div class="flex items-center gap-2">
							<p class="min-w-max">{$LL.CLICK_THE()}</p>
							<svg class="min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px]">
								<use class="fill-transparent" href="/imgs/icons/icons.svg#star" />
							</svg>
						</div>
						<p> {$LL.BY_YOUR_FAVORITE_LEAGUE_OR_TEAM_AND_GAME_TO_ADD()}.</p>
					</div>
				</div>
			</div>
			<CasinoSlot />
			<div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
				<div class="w-full flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-blue">
							<img class="w-[25px]" src="/imgs/kleague.svg" alt="" />
						</div>
						<div class="flex flex-col gap-1">
							<p class="font-medium text-xl text-black dark:text-white">{$LL.K_LEAGUE()}</p>
							<p class="font-medium text-sm text-gray">{$LL.SPORTS()}</p>
						</div>
					</div>
					<div
						class="flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md"
					>
						<svg width="12" height="12">
							<use class="fill-transparent" href="/imgs/icons/icons.svg#star" />
						</svg>
					</div>
				</div>
				<div class="w-full flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-blue">
							<img class="w-[25px]" src="/imgs/kleague.svg" alt="" />
						</div>
						<div class="flex flex-col gap-1">
							<p class="font-medium text-xl text-black dark:text-white">{$LL.K_LEAGUE()}</p>
							<p class="font-medium text-sm text-gray">{$LL.SPORTS()}</p>
						</div>
					</div>
					<div
						class="flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md"
					>
						<svg width="12" height="12">
							<use class="fill-transparent" href="/imgs/icons/icons.svg#star" />
						</svg>
					</div>
				</div>
				<div class="w-full flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-blue">
							<img class="w-[25px]" src="/imgs/kleague.svg" alt="" />
						</div>
						<div class="flex flex-col gap-1">
							<p class="font-medium text-xl text-black dark:text-white">{$LL.K_LEAGUE()}</p>
							<p class="font-medium text-sm text-gray">{$LL.SPORTS()}</p>
						</div>
					</div>
					<div
						class="flex items-center justify-center w-[30px] h-[30px] bg-grayLight4 dark:bg-white5 rounded-md"
					>
						<svg width="12" height="12">
							<use class="fill-transparent" href="/imgs/icons/icons.svg#star" />
						</svg>
					</div>
				</div>
			</div>
			<MiniGames />
			<!-- Footer -->
			<Footer banner={false} />
		</div>
	</div>
</main>
