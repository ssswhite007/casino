<script>
	import globalStore from '@store/globalStore';
	import LoggedinHeader from './headerLoggedin.svelte';
	import { page } from '$app/stores';
	import toast from '@components/toast/toast';
	import ProfileMenu from '$lib/components/menus/profile/profileMenu.svelte';
	import DepositModal from '../modals/deposit/deposit.svelte';
	import NewDepositModal from '../modals/deposit/newDeposit.svelte';
	import WithdrawModal from '../modals/withdraw/withdraw.svelte';
	import MyProfile from '../modals/profile/myProfile.svelte';
	import EditMyProfile from '../modals/profile/editMyProfile.svelte';
	import BetSlip from '../betSlip/betSlip.svelte';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';
	import firebase from '@components/firebase/firebase';
	import { signIn, getAccessToken, getRefreshToken, signupSocial } from '@apis/account';
	import { onMount } from 'svelte';

	$: path = $page.url.pathname;
	$: isLoggedIn = $globalStore.userDetail;
	$: chatOpen = $globalStore.chatOpen;

	let activeProfileMenu = false;

	function openProfileMenu() {
		activeProfileMenu = true;
	}
	function closeProfileMenu() {
		activeProfileMenu = false;
	}

	let activeDepositModal = false;
	let activeNewDepositModal = false;
	let activeWithdrawModal = false;
	function openDepositModal() {
		activeProfileMenu = false;
		activeDepositModal = true;
		activeWithdrawModal = false;
		document.body.style.overflow = 'hidden';
	}

	function openWithdrawModal() {
		activeProfileMenu = false;
		activeDepositModal = false;
		activeWithdrawModal = true;
		document.body.style.overflow = 'hidden';
	}

	let activeMyProfileModal = false;
	let editMyProfileModal = false;

	function openMyProfileModal() {
		activeProfileMenu = false;
		activeMyProfileModal = true;
		editMyProfileModal = false;
		document.body.style.overflow = 'hidden';
	}
	function openNewDepositModal() {
		activeProfileMenu = false;
		activeMyProfileModal = false;
		editMyProfileModal = false;
		document.body.style.overflow = 'hidden';
	}
	function editMyProfile() {
		editMyProfileModal = true;
	}
	function previousMyProfile() {
		editMyProfileModal = false;
	}
	$: activeBetSlip = $globalStore.betSlip;
	function openBetSlip() {
		globalStore.toggleItem('betSlip', !$globalStore.betSlip);
	}

	function closeBetSlip() {
		globalStore.toggleItem('betSlip', false);
	}

	function closeProfileModal() {
		activeDepositModal = false;
		activeMyProfileModal = false;
		activeWithdrawModal = false;
		document.body.style.overflow = 'auto';
	}

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

	function chatToggle(e) {
		chatOpen
			? document.body.classList.remove('chat-active')
			: document.body.classList.add('chat-active');
		globalStore.toggleItem('chatOpen', !$globalStore.chatOpen);
	}
</script>

<header
	id="header"
	class="sticky top-0 w-full px-[15px] sm:px-[30px] py-[17px] bg-white dark:bg-blackDark z-[999]"
>
	<div class="w-full flex items-center justify-between">
		<div class="hidden md:flex items-center gap-[15px]">
			<a
				href="/casino"
				class={`${
					path === '/casino' ? 'active' : ''
				} group header-filter px-[18px] py-[13px] border-[1.14px] hover:bg-grayLight4 dark:hover:bg-white5 border-transparent rounded-[7px] transition-all hover:border-grayLight2 dark:hover:border-white11 flex items-center gap-[9px] cursor-pointer`}
			>
				<div class="header_icon-light hidden group-hover:block">
					<img class="w-[24px]" src="/imgs/casinoR.svg" />
				</div>
				<div class="header_icon-dark block group-hover:hidden">
					<img class="dark:hidden flex w-[24px]" src="/imgs/casinoLight.svg" />
					<img class="dark:flex hidden w-[24px]" src="/imgs/casinoDark.svg" />
				</div>

				<p
					class="text-grayLight3 dark:text-gray font-semibold text-sm group-hover:text-black dark:group-hover:text-white"
				>
					{$LL.CASINO()}
				</p>
			</a>

			<a
				href="/sports"
				class={`${
					path.includes('/sports') ? 'active' : ''
				} group header-filter px-[18px] py-[13px] border-[1.14px] hover:bg-grayLight4 dark:hover:bg-white5 border-transparent rounded-[7px] transition-all hover:border-grayLight2 dark:hover:border-white11 flex items-center gap-[9px] cursor-pointer`}
			>
				<div class="header_icon-light hidden group-hover:block">
					<img class="w-[24px]" src="/imgs/sportsR.svg" />
				</div>
				<div class="header_icon-dark block group-hover:hidden">
					<img class="dark:hidden flex w-[24px]" src="/imgs/sportsLight.svg" />
					<img class="dark:flex hidden w-[24px]" src="/imgs/sportsDark.svg" />
				</div>

				<p
					class="text-grayLight3 dark:text-gray font-semibold text-sm group-hover:text-black dark:group-hover:text-white"
				>
					{$LL.SPORTS()}
				</p>
			</a>
		</div>
		<a href="/" class="flex md:hidden w-full max-w-[42px]">
			<img class="w-full" src="/imgs/Logo.svg" alt="" />
		</a>

		{#if isLoggedIn}
			<LoggedinHeader
				on:openNewDepositModal={openNewDepositModal}
				on:openBetSlip={openBetSlip}
				on:openProfileMenu={openProfileMenu}
			/>
		{:else}
		<div class="flex items-center gap-3">
			<p class="text-black dark:text-white text-[15px]">Login directly with:</p>
			<button
				on:click={signInWithGoogle}
				class="flex items-center justify-center px-8 h-[42px] bg-white5 rounded-full"
			>
				<img src="/imgs/social-platforms/google.svg" alt="google" class="w-full max-w-[18px]" />
			</button>
			<button
			on:click={chatToggle}
			class="hidden md:flex w-[49px] h-[44px] gradient-border rounded-[7px] before:rounded-[7px] bg-purpleLight2 dark:bg-blueDark items-center justify-center"
		>
			<img class="w-[24px]" src="/imgs/chatLinear.svg" alt="" />
		</button>
		</div>
		{/if}
		<img
			src="/imgs/headerElipse.svg"
			class="hidden dark:flex h-[125px] object-cover sm:object-inherit sm:h-auto absolute z-[-1] right-0 bottom-[2px]"
			alt=""
		/>
	</div>
</header>

{#if activeProfileMenu}
	<ProfileMenu
		on:closeProfileMenu={closeProfileMenu}
		on:openDepositModal={openDepositModal}
		on:openWithdrawModal={openWithdrawModal}
		on:openNewDepositModal={openNewDepositModal}
		on:openMyProfileModal={openMyProfileModal}
	/>
{/if}

{#if activeDepositModal}
	<DepositModal on:closeProfileModal={closeProfileModal} />
{/if}
{#if $globalStore.newDepositModal}
	<NewDepositModal id="newDepositModal" />
{/if}

{#if activeWithdrawModal}
	<WithdrawModal on:closeProfileModal={closeProfileModal} />
{/if}

{#if activeMyProfileModal && !editMyProfileModal}
	<MyProfile on:closeProfileModal={closeProfileModal} on:editMyProfile={editMyProfile} />
{:else if activeMyProfileModal && editMyProfileModal}
	<EditMyProfile
		step={true}
		on:stepBack={previousMyProfile}
		on:closeProfileModal={closeProfileModal}
	/>
{/if}

{#if activeBetSlip}
	<BetSlip on:closeBetSlip={closeBetSlip} />
{/if}
