<script>
	import globalStore from '@store/globalStore';
	import { fly } from 'svelte/transition';
	export let my_message_text = '';
	import { clickOutside } from './clickOutside.js';

	export let send_message = () => {};

	let emojis = [];

	$: for (let i = min; i <= max; i++) {
		emojis = [...emojis, String.fromCodePoint(i)];
	}
	export let socket;
	export let room_data;

	const clearEmojiMenu = () => (emojis = []);

	const chooseEmojiSet = (e) => {
		selectedSet = Number(e.target.dataset.id);
		clearEmojiMenu();
	};

	//INSERT EMOJI ICON INTO TEXT FIELD
	const addEmoji = (e) => {
		my_message_text += e.target.textContent;
	};

	let emojiSets = [
		{ type: 'faces', minVal: 128512, maxVal: 128580 },
		{ type: 'faces2', minVal: 129296, maxVal: 129327 },
		{ type: 'body', minVal: 128066, maxVal: 128080 },
		{ type: 'animals', minVal: 129408, maxVal: 129442 },
		{ type: 'transport', minVal: 128640, maxVal: 128676 },
		{ type: 'misc', minVal: 129494, maxVal: 129535 }
	];

	let selectedSet = 0;
	// $: console.log(selectedSet)
	$: min = emojiSets[selectedSet].minVal;
	$: max = emojiSets[selectedSet].maxVal;

	// Header on emoji keyboard to select different emoji sets
	let setIcons = [128512, 129313, 128074, 129417, 128664, 129504];

	// Emoji icon to open modal of emojis
	let emojiIcon = String.fromCodePoint(128571);
	export let emojiModalOpen = false;

	//LOAD GIFS
	const API_URL = 'https://api.giphy.com/v1/gifs/trending?api_key=RF1jPDlgKN4thCZCWBdMMqwWkFXF7ycX&limit=42';

	let gifs = [];

	async function loadGif() {
		gifModalOpen = !gifModalOpen;
		const response = await fetch(API_URL);
		const json = await response.json();
		console.log(json);
		gifs = json.data.map((gif) => gif.images.downsized_medium.url);
	}
	//END - LOAD GIFS

	let gif_message = '';

	let gifModalOpen = false;

	//CLIENT EMIT MESSAGE (GIF)
	const addGif = (e) => {
		gif_message = '<div class="gif-chat-item"><img src="' + e.target.src + '"></div>';
		const message = {
			to: room_data,
			from: null,
			username: $globalStore.userDetail.nickname,
			avatar: $globalStore.userDetail.profile_image,
			content: gif_message,
			time: new Date().toString()
		};

		socket.emit('sendMessage', message);

		gifModalOpen = false;
	};
</script>

<div class="pt-[29px] pb-[18px] bg-gradientWhiteLight dark:bg-gradientBlack w-full" style="position: absolute;bottom: 0; left: 0;">
	<form on:submit|preventDefault={send_message}>
		<div class="relative">
			<input
				required
				bind:value={my_message_text}
				placeholder="Write a message"
				type="text"
				class="w-full bg-white dark:bg-blueDark rounded-[14px] h-[53px] outline-none border border-grayLight dark:border-white11 px-[18px] placeholder:text-gray text-black dark:text-white text-sm"
			/>
			<button class="absolute right-[0px] opacity-60 hover:opacity-100 flex items-center top-[50%] translate-y-[-50%] w-[40px] h-[40px]" type="submit">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16.1269 4.20144C17.9162 3.60499 19.0284 3.88221 19.5702 4.42486C20.1129 4.96839 20.3895 6.08413 19.7979 7.87367L19.7976 7.87444L16.9682 16.3628L16.9681 16.3631C16.5091 17.7424 15.9945 18.7182 15.4857 19.3343C14.975 19.9528 14.5395 20.1324 14.2197 20.1324C13.8999 20.1324 13.4644 19.9528 12.9536 19.3343C12.4449 18.7182 11.9303 17.7424 11.4713 16.3631L11.4712 16.3628L10.7177 14.1022L14.2205 10.5897C14.513 10.2964 14.5123 9.82148 14.219 9.529C13.9257 9.23651 13.4509 9.23718 13.1584 9.53048L9.57837 13.1205C9.56475 13.1341 9.55176 13.1482 9.53941 13.1626L7.63686 12.5284L7.63648 12.5283C6.25694 12.0692 5.2811 11.5552 4.66498 11.0471C4.04637 10.5369 3.86719 10.1024 3.86719 9.78368C3.86719 9.46471 4.04661 9.02942 4.66558 8.5179C5.28188 8.00859 6.25779 7.49278 7.63714 7.03135L7.63761 7.03119L16.1269 4.20144ZM21.2218 8.34541C21.8898 6.3254 21.7614 4.49638 20.6317 3.36499C19.501 2.23264 17.6732 2.10486 15.6525 2.77841L7.16252 5.60841L7.16177 5.60866C5.68637 6.10219 4.52117 6.69132 3.71004 7.36164C2.90152 8.02981 2.36719 8.84889 2.36719 9.78368C2.36719 10.7187 2.90175 11.5373 3.71065 12.2043C4.52195 12.8734 5.68723 13.4605 7.16252 13.9514L7.16289 13.9516L9.32676 14.6729L10.0481 16.8367L10.0481 16.837L10.0482 16.8371C10.5392 18.3126 11.127 19.478 11.797 20.2893C12.465 21.0983 13.2845 21.6324 14.2197 21.6324C15.1549 21.6324 15.9744 21.0983 16.6424 20.2893C17.3124 19.478 17.9002 18.3126 18.3912 16.8371L18.3913 16.8367L21.2212 8.3471L21.2218 8.34541Z"
						fill="url(#paint0_linear_2501_35365)"
					/>
					<defs>
						<linearGradient id="paint0_linear_2501_35365" x1="6.00534" y1="-1.27108" x2="21.7625" y2="2.26825" gradientUnits="userSpaceOnUse">
							<stop stop-color="#C6A3FF" />
							<stop offset="1" stop-color="#7E8BED" />
						</linearGradient>
					</defs>
				</svg>
			</button>
			<div class="absolute left-[30px] bottom-[50%] translate-y-[-50%] w-[40px] h-[40px]" id="emoji-opener-icon" on:click={() => (emojiModalOpen = !emojiModalOpen)}>
				<img src="/imgs/smiling-eyes.svg" alt="" />
			</div>
			<div class="absolute left-[0px] bottom-[50%] translate-y-[-50%] w-[40px] h-[40px]" style="font-size: 32px;" id="gif-opener-icon" on:click={loadGif}>
				<img src="/imgs/picture.svg" alt="" />
			</div>
		</div>
	</form>

	{#if gifModalOpen}
		<div class="gif-main">
			<div class="gif-box-wrapper" transition:fly={{ y: -30 }}>
				<div style="margin-top:20px" class="ui-scrollview">
					{#each gifs as gif}
						<div class="gif-item">
							<img src={gif} alt="trending gif" on:click={addGif} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
	{#if emojiModalOpen}
		<div style="margin-top:20px" id="emoji-cont" class="bg-black overflow-hidden" transition:fly={{ y: -30 }} use:clickOutside>
			<header>
				{#each setIcons as icon, i}
					<div data-id={i} on:click={chooseEmojiSet}>
						{String.fromCodePoint(icon)}
					</div>
				{/each}
				<div id="closer-icon" on:click={() => (emojiModalOpen = false)}>X</div>
			</header>

			{#each emojis as emoji}
				<span on:click={addEmoji}>{emoji}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	#emoji-opener-icon {
		font-size: 2rem;
		cursor: pointer;
	}
	#emoji-opener-icon img {
		width: 30px;
	}
	#emoji-opener-icon:active {
		cursor: pointer;
	}

	#emoji-cont {
		max-width: 300px;
		max-height: 248px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-left: 10px;
		cursor: pointer;
		position: absolute;
		bottom: 120px;
		/* 		border: 1px solid gray;
        background: #ddd; */
	}

	#emoji-cont header {
		width: 98%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border: 1px solid gray;
	}

	#emoji-cont header div {
		cursor: pointer;
	}

	#gif-openeer-icon {
		padding-right: 5px;
	}
	#gif-opener-icon img {
		width: 24px;
		cursor: pointer;
	}

	.gif-main {
		position: relative;
	}
	.gif-box-wrapper {
		background-color: #000;
		width: 20rem;
		height: 30.3125rem;
		box-shadow: 0 2px 12px #0003;
		padding: 10px 10px 25px;
		border-radius: var(--border-radius);
		position: absolute;
		bottom: 100px;
		right: 0;
	}

	.ui-scrollview {
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;
		-webkit-flex: 1 1 1px;
		-ms-flex: 1 1 1px;
		flex: 1 1 1px;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-y;
		overscroll-behavior: contain;

		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		height: 100%;
	}

	.gif-item {
		width: 48%;
		height: 80px;
		margin-bottom: 10px;
		cursor: pointer;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
		background-color: var(--53yx82);
		-webkit-animation: cplaceholderShimmer-gez0w20 1.5s linear infinite;
		animation: cplaceholderShimmer-gez0w20 1.5s linear infinite;
	}
	.gif-item img {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		height: 100%;
	}
</style>
