<script>
	import toast from '@components/toast/toast';
	import globalStore from '@store/globalStore';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { signIn, getAccessToken, getRefreshToken, signupSocial } from '@apis/account';
	import firebase from '@components/firebase/firebase';
	import { LL, setLocale, locale } from "@src/i18n/i18n-svelte";

	const dispatch = createEventDispatcher();
	const BOT_NAME = import.meta.env.VITE_TELEGRAM_BOT_NAME;
	const REDIRECT_URL = import.meta.env.VITE_TELEGRAM_REDIRECT_URL;

	let signInUserData = {
		email: '',
		password: ''
	};

	onMount(async () => {
		handleTokens();
		handleTelegram();
		if ($globalStore.telegramUserData) {
			const userInfo = $globalStore.telegramUserData;
			signInWithTelegram(userInfo);
		}
	});

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
			toast.error('Bad Network Connection');
		}
	}

	function handleTelegram() {
		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?14';
		script.setAttribute('data-telegram-login', BOT_NAME);
		script.setAttribute('data-size', 'large');
		script.setAttribute('data-auth-url', REDIRECT_URL);
		document.getElementById('telegram-login').appendChild(script);
		document.getElementById('telegram-login').style.opacity = '1%';
	}

	function openSignUp() {
		dispatch('openSignUp');
	}

	function openForgotPasswordForm() {
		dispatch('openForgotPasswordForm');
	}

	async function handleSignIn(event) {
		const res = await signIn({
			email: signInUserData.email,
			password: signInUserData.password
		});
		if (res.success) {
			toast.success(res.data.message);
			globalStore.toggleItem('loginForm', false);
			handleTokens();
		} else {
			toast.error(res.data.message);
		}
	}

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		await provider.addScope('email');
		const data = await firebase.auth().signInWithPopup(provider);
		const userInfo = data.additionalUserInfo.profile;
		const res = await signupSocial({
			email: 'g_' + userInfo.id,
			password: userInfo.id,
			loginType: 'google'
		});
		try {
			const res1 = await signIn({
				email: 'g_' + userInfo.id,
				password: userInfo.id
			});

			if (res1.success) {
				toast.success(res1.data.message);
				globalStore.toggleItem('loginForm', false);
				handleTokens();
			} else {
				toast.error(res1.data.message);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function signInWithFacebook() {
		const provider = new firebase.auth.FacebookAuthProvider();
		await provider.addScope('email');
		const data = await firebase.auth().signInWithPopup(provider);
		const userInfo = data.additionalUserInfo.profile;
		const res = await signupSocial({
			email: 'f_' + userInfo.id,
			password: userInfo.id,
			loginType: 'facebook'
		});
		try {
			const res1 = await signIn({
				email: 'f_' + userInfo.id,
				password: userInfo.id
			});

			if (res1.success) {
				toast.success(res1.data.message);
				globalStore.toggleItem('loginForm', false);
				handleTokens();
			} else {
				toast.error(res1.data.message);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function signInWithApple() {
		const provider = new OAuthProvider('apple.com');
		try {
			const data = await firebase.auth().signInWithPopup(provider);
			// console.log(data.additionalUserInfo.profile);
			// User signed in successfully
		} catch (error) {
			console.error(error);
		}
	}

	async function signInWithTelegram(userInfo) {
		const res = await signupSocial({
			email: 't_' + userInfo.id,
			password: userInfo.id,
			loginType: 'telegram'
		});
		try {
			const res1 = await signIn({
				email: 't_' + userInfo.id,
				password: userInfo.id
			});

			if (res1.success) {
				toast.success(res1.data.message);
				globalStore.toggleItem('loginForm', false);
				handleTokens();
			} else {
				toast.error(res1.data.message);
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h5 class="text-2xl font-medium text-white">{$LL.LOGIN()}</h5>
<p class="mb-[25px] text-sm text-grayDark3 mt-[15px]">{$LL.WELCOME_BACK_PLEASE_ENTER_YOUR_DETAILS()}</p>
<form class="w-full" on:submit={handleSignIn}>
	<div class="flex flex-col w-full gap-[15px]">
		<div class="flex flex-col gap-[9px]">
			<label class="text-msm text-white font-medium" for="email">{$LL.EMAIL_ADDRESS()}</label>
			<div class="w-full flex">
				<input
					type="email"
					id="email"
					class="w-full rounded-[7px] bg-white3 border-2 border-white16 focus:border-white32 !outline-none focus:outline-white p-[11px] text-sm text-white"
					bind:value={signInUserData.email}
					required
				/>
			</div>
		</div>
		<div class="flex flex-col gap-[9px]">
			<label class="text-msm text-white font-medium" for="password">{$LL.PASSWORD()}</label>
			<div class="w-full flex">
				<input
					type="password"
					id="password"
					class="w-full rounded-[7px] bg-white3 border-2 border-white16 focus:border-white32 !outline-none focus:outline-white p-[11px] text-sm text-white"
					bind:value={signInUserData.password}
					required
				/>
			</div>
		</div>
		<a href="#" on:click={openForgotPasswordForm} class="text-end text-msm text-grayDark2"
			>{$LL.FORGOT_PASSWORD()}?</a
		>
		<button
			type="submit"
			class="w-full bg-linear p-[13px] rounded-[7px] text-sm font-semibold text-white opacity-90 hover:opacity-100 transition-all"
		>
			{$LL.SIGN_IN()}
		</button>
	</div>
	<div class="flex items-center justify-center mt-[15px] gap-[4px]">
		<p class="text-msm text-grayDark3 font-medium">
			{$LL.DONT_HAVE_ACCOUNT()}? <a href="#" on:click={openSignUp} class="gradient-text font-bold"
				>{$LL.SIGN_UP()}</a
			>
		</p>
	</div>
</form>

<div
	class="relative mt-[30px] text-msm text-grayDark3 font-medium text-center
        before:content-[''] before:absolute before:left-[0] before:top-[50%] before:translate-y-[-50%] before:w-[30%] before:h-[1px] before:bg-grayDark3 before:rounded-[10px]
        after:content-[''] after:absolute after:right-[0] after:top-[50%] after:translate-y-[-50%] after:w-[30%] after:h-[1px] after:bg-grayDark3 after:rounded-[10px]
        "
>
{$LL.OR_CONTINUE_WITH()}
</div>
<div class="flex w-full items-center justify-center gap-[20px] mt-[30px]">
	<button
		on:click={signInWithGoogle}
		class="flex items-center justify-center w-[42px] h-[42px] bg-white5 rounded-full"
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_709_27938)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M11.229 4.36523C10.403 3.57743 9.3007 3.14825 8.16015 3.16589C6.07307 3.16589 4.30053 4.57393 3.66852 6.46993C3.33341 7.46349 3.33341 8.53941 3.66851 9.53298H3.67145C4.30639 11.4261 6.076 12.8341 8.16309 12.8341C9.24044 12.8341 10.1653 12.5585 10.8822 12.0718V12.0698C11.7258 11.5113 12.302 10.6324 12.4813 9.63882H8.16016V6.55817H15.706C15.8001 7.09317 15.8442 7.63992 15.8442 8.18374C15.8442 10.617 14.9746 12.6742 13.4615 14.0675L13.4631 14.0687C12.1374 15.2916 10.3178 16 8.16015 16C5.13535 16 2.36922 14.2951 1.01115 11.5936C-0.123511 9.33309 -0.123508 6.66985 1.01116 4.40934C2.36923 1.70495 5.13535 -1.02057e-05 8.16015 -1.02057e-05C10.1473 -0.0235266 12.0668 0.723121 13.5131 2.0812L11.229 4.36523Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_709_27938">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	</button>
	<button class="flex items-center justify-center w-[42px] h-[42px] bg-white5 rounded-full">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_709_27941)">
				<path
					d="M14.5286 12.469C14.2867 13.028 14.0002 13.5426 13.6684 14.0157C13.2161 14.6606 12.8457 15.107 12.5603 15.3549C12.1178 15.7618 11.6438 15.9702 11.1361 15.982C10.7717 15.982 10.3322 15.8783 9.82063 15.668C9.30736 15.4586 8.83567 15.3549 8.40438 15.3549C7.95204 15.3549 7.46692 15.4586 6.94803 15.668C6.42834 15.8783 6.00969 15.988 5.6896 15.9988C5.2028 16.0196 4.71758 15.8052 4.23325 15.3549C3.92412 15.0853 3.53747 14.6231 3.07427 13.9683C2.5773 13.269 2.16872 12.4582 1.84863 11.5338C1.50583 10.5353 1.33398 9.56839 1.33398 8.63232C1.33398 7.56006 1.56568 6.63524 2.02976 5.86026C2.39449 5.23776 2.87971 4.74671 3.487 4.38623C4.09429 4.02574 4.75047 3.84205 5.45711 3.83029C5.84377 3.83029 6.35081 3.94989 6.98091 4.18495C7.60924 4.42079 8.01268 4.54039 8.18957 4.54039C8.32181 4.54039 8.76999 4.40055 9.52977 4.12174C10.2483 3.86318 10.8547 3.75612 11.3514 3.79829C12.6976 3.90693 13.7089 4.43758 14.3815 5.3936C13.1776 6.12306 12.582 7.14476 12.5939 8.45544C12.6047 9.47634 12.9751 10.3259 13.703 11.0004C14.0328 11.3135 14.4012 11.5555 14.8111 11.7273C14.7222 11.9851 14.6284 12.232 14.5286 12.469V12.469ZM11.4413 0.320274C11.4413 1.12046 11.149 1.86759 10.5663 2.55912C9.86309 3.38122 9.01255 3.85627 8.09021 3.78131C8.07846 3.68531 8.07164 3.58427 8.07164 3.47811C8.07164 2.70993 8.40605 1.88783 8.99991 1.21565C9.29639 0.875319 9.67347 0.592335 10.1307 0.366593C10.587 0.14422 11.0186 0.0212425 11.4245 0.000183105C11.4364 0.107155 11.4413 0.214134 11.4413 0.320264V0.320274Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_709_27941">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	</button>
	<button
		on:click={signInWithFacebook}
		class="flex items-center justify-center w-[42px] h-[42px] bg-white5 rounded-full"
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.98142 15.922H9.15428V7.88741H11.3689L11.6101 5.2007H9.15428V3.67184C9.15428 3.03215 9.27484 2.78906 9.88403 2.78906H11.6101V0H9.40176C7.03481 0 5.96873 1.0491 5.96873 3.05773V5.2071H4.3125V7.92579H5.96873L5.98142 15.922Z"
				fill="white"
			/>
		</svg>
	</button>

	<div class="relative cursor-pointer">
		<div>
			<button class="flex items-center justify-center w-[42px] h-[42px] bg-white5 rounded-full">
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_2708_75443)">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M13.1851 2.95334C13.3498 2.884 13.5302 2.86009 13.7073 2.88409C13.8844 2.90808 14.0519 2.97912 14.1922 3.0898C14.3326 3.20048 14.4407 3.34675 14.5053 3.5134C14.57 3.68004 14.5888 3.86097 14.5598 4.03734L13.0478 13.2087C12.9011 14.0933 11.9304 14.6007 11.1191 14.16C10.4404 13.7913 9.43242 13.2233 8.52575 12.6307C8.07242 12.334 6.68375 11.384 6.85442 10.708C7.00109 10.13 9.33442 7.95801 10.6678 6.66667C11.1911 6.15934 10.9524 5.86667 10.3344 6.33334C8.79909 7.49201 6.33575 9.25401 5.52109 9.75001C4.80242 10.1873 4.42775 10.262 3.97975 10.1873C3.16242 10.0513 2.40442 9.84067 1.78575 9.58401C0.949753 9.23734 0.99042 8.08801 1.78509 7.75334L13.1851 2.95334Z"
							fill="white"
						/>
					</g>
					<defs>
						<clipPath id="clip0_2708_75443">
							<rect width="16" height="16" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>

		<div id="telegram-login" class="w-[42px] absolute top-0 z-[999]" />
	</div>
</div>
