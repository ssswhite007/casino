<script>
	import globalStore from '@store/globalStore';
	import { page } from '$app/stores';

	$: path = $page.url.pathname;

	$: sidebarOpen = $globalStore.sidebar;
	$: chatOpen = $globalStore.chatOpen;
	$: betSlip = $globalStore.betSlip;
	function handleOpenedModules() {
		globalStore.toggleItem('betSlip', false);
		globalStore.toggleItem('chatOpen', false);
		globalStore.toggleItem('sidebar', false);
		document.body.classList.remove('aside-active');
	}
	function toggleBetSlip() {
		globalStore.toggleItem('betSlip', !$globalStore.betSlip);
		globalStore.toggleItem('chatOpen', false);
		globalStore.toggleItem('sidebar', false);
	}

	function handleSidebar() {
		if (!sidebarOpen) {
			document.body.classList.add('aside-active');
		} else {
			document.body.classList.remove('aside-active');
		}
		globalStore.toggleItem('sidebar', !$globalStore.sidebar);
		globalStore.toggleItem('betSlip', false);
		globalStore.toggleItem('chatOpen', false);
	}

	function chatToggle(e) {
		chatOpen
			? document.body.classList.remove('chat-active')
			: document.body.classList.add('chat-active');
		globalStore.toggleItem('chatOpen', !$globalStore.chatOpen);

		globalStore.toggleItem('sidebar', false);
		document.body.classList.remove('aside-active');

		globalStore.toggleItem('betSlip', false);
	}
</script>

<div class="md:hidden sticky bottom-0 w-full bg-white dark:bg-black z-[999999999]">
	<div
		class="relative w-full pb-[10px] flex items-center justify-between sm:justify-around gap-[15px] px-[35px] overflow-hidden"
	>
		<img
			src="/imgs/headerElipse.svg"
			class="z-[-1] h-full absolute rotate-[180deg] bottom-0 left-[-35%]"
			alt=""
		/>

		<a
			href="#"
			on:click={handleSidebar}
			class="group pt-[15px] relative flex flex-col items-center gap-[7px]"
		>
			<img
				class={`${
					sidebarOpen ? '' : 'opacity-0'
				} absolute top-[-9px] min-w-[60px] left-[50%]  translate-x-[-50%] group-hover:opacity-[1] transition-all`}
				src="/imgs/mobileRadial.svg"
				alt="navRadial"
			/>
			<svg class="w-[21px] h-[21px]">
				<use
					class={`${sidebarOpen ? 'fill-blue' : 'fill-grayDark'} group-hover:fill-blue`}
					href="/imgs/icons/icons.svg#menu"
				/>
			</svg>
			<p
				class={`${
					sidebarOpen ? 'text-blue' : 'text-grayDark'
				} text-xs font-medium group-hover:text-blue`}
			>
				Menu
			</p>
		</a>

		<a
			href="/casino"
			on:click={handleOpenedModules}
			class="group pt-[15px] relative flex flex-col items-center gap-[7px]"
		>
			<img
				class={`${
					path === '/casino' ? '' : 'opacity-0'
				} absolute top-[-9px] min-w-[60px] left-[50%]  translate-x-[-50%] group-hover:opacity-[1] transition-all`}
				src="/imgs/mobileRadial.svg"
				alt="navRadial"
			/>
			<svg class="w-[21px] h-[21px]">
				<use
					class={`${path === '/casino' ? 'fill-blue' : 'fill-grayDark'} group-hover:fill-blue`}
					href="/imgs/icons/icons.svg#casino"
				/>
			</svg>
			<p
				class={`${
					path === '/casino' ? 'text-blue' : 'text-grayDark'
				} text-xs font-medium group-hover:text-blue`}
			>
				Casino
			</p>
		</a>

		<a href="/sports" class="group pt-[15px] relative flex flex-col items-center gap-[7px]">
			<img
				class={`${
					path.includes('/sports') ? '' : 'opacity-0'
				} absolute top-[-9px] min-w-[60px] left-[50%]  translate-x-[-50%] group-hover:opacity-[1] transition-all`}
				src="/imgs/mobileRadial.svg"
				alt="navRadial"
			/>
			<svg class="w-[21px] h-[21px]">
				<use
					class={`${path.includes('/sports') ? 'fill-blue' : 'fill-grayDark'
					} group-hover:fill-blue`}
					href="/imgs/icons/icons.svg#sports"
				/>
			</svg>
			<p
				class={`${
					path.includes('/sports') ? 'text-blue' : 'text-grayDark'
				} text-xs font-medium group-hover:text-blue`}
			>
				Sports
			</p>
		</a>

		<a
			href="#"
			on:click={chatToggle}
			class="group pt-[15px] relative flex flex-col items-center gap-[7px]"
		>
			<img
				class={`${
					chatOpen ? '' : 'opacity-0'
				} absolute top-[-9px] min-w-[60px] left-[50%]  translate-x-[-50%] group-hover:opacity-[1] transition-all`}
				src="/imgs/mobileRadial.svg"
				alt="navRadial"
			/>
			<svg class="w-[21px] h-[21px]">
				<use
					class={`${chatOpen ? 'fill-blue' : 'fill-grayDark'} group-hover:fill-blue`}
					href="/imgs/icons/icons.svg#chat"
				/>
			</svg>
			<p
				class={`${
					chatOpen ? 'text-blue' : 'text-grayDark'
				} text-xs font-medium group-hover:text-blue`}
			>
				Chat
			</p>
		</a>

		<a
			href="#"
			on:click={toggleBetSlip}
			class="group pt-[15px] relative flex flex-col items-center gap-[7px]"
		>
			<img
				class={`${
					betSlip ? '' : 'opacity-0'
				} absolute top-[-9px] min-w-[60px] left-[50%]  translate-x-[-50%] group-hover:opacity-[1] transition-all`}
				src="/imgs/mobileRadial.svg"
				alt="navRadial"
			/>
			<svg class="w-[21px] h-[21px]">
				<use
					class={`${betSlip ? 'fill-blue' : 'fill-grayDark'} group-hover:fill-blue`}
					href="/imgs/icons/icons.svg#betSlip"
				/>
			</svg>
			<p
				class={`${
					betSlip ? 'text-blue' : 'text-grayDark'
				} text-xs font-medium group-hover:text-blue`}
			>
				Bet Slip
			</p>
		</a>
	</div>
</div>
