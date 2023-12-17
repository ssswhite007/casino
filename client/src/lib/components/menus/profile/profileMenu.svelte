<script>
	import { createEventDispatcher } from 'svelte';
	import { signOut } from '@apis/account';
	import toast from '../../toast/toast';
	import globalStore from '@store/globalStore';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	let darkMode;

	onMount(() => {
		darkMode = false;
		if (Cookies.get('Mode') == 'Dark') {
			darkMode = true;
		}
	});

	const dispathEvent = createEventDispatcher();
	function closeProfileMenu() {
		dispathEvent('closeProfileMenu');
	}

	document.addEventListener('click', (e) => {
		if (
			!e.target.closest('#headerProfile') &&
			!e.target.closest('#profileModal') &&
			!e.target.closest('#closeProfileMenu')
		) {
			dispathEvent('closeProfileMenu');
		}
	});

	function openDepositModal() {
		dispathEvent('openDepositModal');
	}

	function openWithdrawModal() {
		dispathEvent('openWithdrawModal');
	}

	function openMyProfileModal() {
		dispathEvent('openMyProfileModal');
	}

	function handleChange(val) {
		if (val === 'dark') {
			// globalStore.toggleItem('darkMode', true)
			Cookies.set('Mode', 'Dark');
			darkMode = true;
			document.documentElement.classList.add('dark');
		} else {
			// globalStore.toggleItem('darkMode', false)
			Cookies.set('Mode', 'Light');
			darkMode = false;
			document.documentElement.classList.remove('dark');
		}
	}

	async function handleSignOut(event) {
		const res = await signOut();
		if (res.success) {
			toast.success($LL[res.data.key]());
			globalStore.toggleItem('userDetail', null);
			dispathEvent('closeProfileMenu');
			document.body.classList.remove('chat-active');
			globalStore.toggleItem('chatOpen', false);
			globalStore.toggleItem('betSlip', false);
		} else {
			toast.error($LL[res.data.key]());
		}
	}
</script>

<div
	id="profileModal"
	class="fixed translate-x-[50%] sm:translate-x-[auto] right-[50%] sm:right-[20px] w-[96%] sm:w-auto top-[80px] sm:top-[20px] z-[999999] bg-white dark:bg-black rounded-[14px] overflow-hidden border border-white11"
>
	<div class="relative z-[2] min-w-[300px] sm:w-auto p-[15px]">
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-[9px]">
				<div class="w-[48px] h-[48px]">
					<img src={$globalStore.userDetail.profileImage} class="rounded-full" alt="user" />
				</div>
				<div class="flex flex-col">
					<p class="text-md gradient-text">{$globalStore.userDetail.nickname}</p>
					<div class="flex items-center gap-[7px]">
						<img class="w-[14px]" src="/imgs/medal.svg" alt="" />
						<p class="text-gray font-normal text-base">level 1</p>
					</div>
				</div>
			</div>
			<div
				id="closeProfileMenu"
				on:click={closeProfileMenu}
				class="w-[31px] h-[31px] rounded-full bg-grayLight4 dark:bg-white11 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer"
			>
				<svg class="w-[16px] h-[16px] translate-x-[1px] translate-y-[1px]">
					<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#close" />
				</svg>
			</div>
		</div>

		<div class="flex flex-col gap-[12px] mt-[19px] pb-[15px] border-b border-b-white11">
			<p class="text-black50 dark:text-white50 font-medium text-msm">Theme</p>
			<div
				class="w-full flex items-center justify-around bg-grayLight4 dark:bg-white5 rounded-[7px] p-[5px]"
			>
				<label class="w-[48%] cursor-pointer">
					<input
						on:change={() => handleChange('light')}
						type="radio"
						name="colorMode"
						checked={!darkMode ? true : false}
						value="light"
						class="custom-peer sr-only"
					/>
					<div
						class="flex items-center justify-center gap-[6px] parent border border-transparent transition-all w-full rounded-[7px] p-[6px]"
					>
						<svg class="w-[16px] h-[16px]">
							<use class="icon stroke" href="/imgs/icons/icons.svg#sun" />
						</svg>
						<p class="text-black50 dark:text-white50 font-medium text-msm text">Light</p>
					</div>
				</label>
				<label class="w-[48%] cursor-pointer">
					<input
						on:change={() => handleChange('dark')}
						type="radio"
						checked={darkMode}
						name="colorMode"
						value="dark"
						class="custom-peer sr-only"
					/>
					<div
						class="flex items-center justify-center gap-[6px] parent border border-transparent transitiona-all w-full rounded-[7px] p-[6px]"
					>
						<svg class="w-[16px] h-[16px]">
							<use class="icon fill-grayDark2" href="/imgs/icons/icons.svg#moon" />
						</svg>
						<p class="text-black50 dark:text-white50 font-medium text-msm text">Dark</p>
					</div>
				</label>
			</div>
		</div>

		<div class="flex flex-col gap-[12px] mt-[15px] pb-[15px] border-b border-b-white11">
			<p class="text-black50 dark:text-white50 font-medium text-msm">My Account</p>
			<div class="flex flex-col gap-[5px]">
				<a
					href="/account/settings"
					on:click={closeProfileMenu}
					class="group hover:bg-grayLight4 dark:hover:bg-white5 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] opacity-50 group-hover:opacity-100">
						<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#settings" />
					</svg>
					<p
						class="text-sm font-medium text-black dark:text-white opacity-50 group-hover:opacity-100"
					>
						Settings
					</p>
				</a>
				<a
					href="#"
					on:click={openDepositModal}
					class="group hover:bg-grayLight4 dark:hover:bg-white5 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] opacity-50 group-hover:opacity-100">
						<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#card" />
					</svg>
					<p
						class="text-sm font-medium text-black dark:text-white opacity-50 group-hover:opacity-100"
					>
						Deposit
					</p>
				</a>
				<a
					href="#"
					on:click={openWithdrawModal}
					class="group hover:bg-grayLight4 dark:hover:bg-white5 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] opacity-50 group-hover:opacity-100">
						<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#card-send" />
					</svg>
					<p
						class="text-sm font-medium text-black dark:text-white opacity-50 group-hover:opacity-100"
					>
						Withdraw
					</p>
				</a>
				<a
					href="/transactions"
					on:click={closeProfileMenu}
					class="group hover:bg-grayLight4 dark:hover:bg-white5 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] opacity-50 group-hover:opacity-100">
						<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#card" />
					</svg>
					<p
						class="text-sm font-medium text-black dark:text-white opacity-50 group-hover:opacity-100"
					>
						Transactions
					</p>
				</a>
				<a
					href="#"
					on:click={openMyProfileModal}
					class="group hover:bg-grayLight4 dark:hover:bg-white5 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] opacity-50 group-hover:opacity-100">
						<use class="fill-black dark:fill-white" href="/imgs/icons/icons.svg#user" />
					</svg>
					<p
						class="text-sm font-medium text-black dark:text-white opacity-50 group-hover:opacity-100"
					>
						My Profile
					</p>
				</a>
			</div>
		</div>

		<div class="flex flex-col gap-[12px] mt-[15px]">
			<div class="flex flex-col gap-[5px]">
				<button
					on:click={handleSignOut}
					class="group bg-red5 hover:bg-red50 flex items-center gap-[6px] p-[9px] rounded-[7px] transition-all"
				>
					<svg class="w-[20px] h-[20px] group-hover:opacity-100">
						<use class="fill-red" href="/imgs/icons/icons.svg#settings" />
					</svg>
					<p class="text-sm font-medium text-red group-hover:opacity-100">Logout</p>
				</button>
			</div>
		</div>
	</div>
	<img src="/imgs/elipse.svg" class="absolute top-0 right-[0] z-[1] dark:flex hidden" alt="" />
</div>
