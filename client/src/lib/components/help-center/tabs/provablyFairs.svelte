<script>
	import { writable } from 'svelte/store';
	import globalStore from '@store/globalStore';
	import Select from '../../select/select.svelte';
	import Switch from '../../switch/switch.svelte';
	import SelectPlugin from 'svelte-select';

	$: darkMode = $globalStore.darkMode;

	function handleChange(val) {
		if (val === 'dark') {
			globalStore.toggleItem('darkMode', true);
			document.documentElement.classList.add('dark');
		} else {
			globalStore.toggleItem('darkMode', false);
			document.documentElement.classList.remove('dark');
		}
	}

	const gameSettings = [
		{ value: 'KRW', label: 'KRW'},
		{ value: 'KRW2', label: 'KRW2' },
		{ value: 'KRW3', label: 'KRW3'}
	];
</script>

<div class="w-full flex flex-col gap-[20px]">
	<div class="w-full flex flex-col gap-[20px] border-grayLight dark:border-white11">
		<p class="text-base text-black dark:text-white font-medium ">
			Game
		</p>

        <div class="w-full">
            <Select items={gameSettings} />
        </div>
	</div>

    <div class="w-full flex flex-col gap-[20px] dark:border-white11">
		<p class="text-base text-black dark:text-white font-medium">
			Faiirness
		</p>

        <div class="w-full flex flex-col gap-[12px]">
            <p class="text-sm font-semibold text-grayDark">Is The Game Fair?</p>
            <p class="text-msm font-medium text-grayDark">We have generated a total of 10 million hashes (the generation chain is verifiable), and each hash corresponds to a curve crash multiplier.</p>
            <p class="text-msm font-medium text-grayDark">We release these 10 million numbers in reverse order, each corresponding to one turn of the game (i.e. we have 10 million turns in total).</p>
            <p class="text-msm font-medium text-grayDark">In other words, the crash number of each turn already exists and is not calculated after the game starts. Players can therefore place their bet without concern.</p>
        </div>
	</div>

    <div class="w-full flex flex-col gap-[20px] dark:border-white11">
        <div class="w-full flex flex-col gap-[12px]">
            <p class="text-sm font-semibold text-grayDark">Will The Game Be Manipulated By The Platform <a href="#" class="font-semibold text-purpleLight">Github Verify</a></p>
            <p class="text-msm font-medium text-grayDark pl-[6px]">1) We have generated a total of 10 million hashes (the generation chain is verifiable), and each hash corresponds to a curve crash multiplier.</p>
            <p class="text-msm font-medium text-grayDark pl-[6px]">2) We release these 10 million numbers in reverse order, each corresponding to one turn of the game (i.e. we have 10 million turns in total).</p>
            <p class="text-msm font-medium text-grayDark pl-[6px]">3) In other words, the crash number of each turn already exists and is not calculated after the game starts. Players can therefore place their bet without concern.</p>
            <p class="text-msm font-medium text-grayDark">Conclusion: The hash value used in the game is inverse ordered. Therefore, with the SHA256 algorithm, a previous hash used in the game can be calculated from its subsequent hash. Since there is one-to-one correspondence between the key and the value of hash, we can draw the conclusion that if a hash can be used to calculate the hash that precedes it, then this hash should have been already generated when the preceding prize is announced. Similarly, the entire hash chain is generated at the very beginning and cannot be changed once generated. Otherwise, it cannot pass verification by SHA256, and as far as the payout is concerned, this is nothing more than a probability game in which crash is a given. The official organizer cannot manipulate any game set. Therefore, CRASH is more transparent than other gambling methods. This is the cornerstone on which our game is built.</p>
        </div>
	</div>
</div>
