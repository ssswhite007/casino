<script>
	import { onMount } from 'svelte';
	import globalStore from '@store/globalStore';
	import BreadCrumb from '$lib/components/breadCrumb/breadCrumb.svelte';
	import ActivityTable from '$lib/components/main/activityTable/activityTable.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import { LaunchCasino } from '@apis/casino';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';
	import SliderView from '$lib/components/sliderview/sliderView.svelte';

	import firebase from '@components/firebase/firebase';
	import { signIn, getAccessToken, getRefreshToken, signupSocial } from '@apis/account';
	import toast from '@components/toast/toast';

	$: isLoggedIn = $globalStore.userDetail;

	export let data;
	let link = '';
	const title = data.title;
	const type = data.type;
	const idx = data.idx;
	let isPlay = false;

	$: nick = $globalStore.userDetail ? $globalStore.userDetail.nickname : `demo`;

	const breadCrumbPages = [
		{
			name: 'casino',
			route: '/casino'
		},
		{
			name: type,
			route: `/casino/${type}`
		}
	];

	$: {
		if (!$globalStore.userDetail) {
			isPlay = false;
			link = '';
		} else {
			updateLink();
		}
	}

	onMount(async () => {
		await updateLink();
	});

	const loginAndStart = async () => {
		// globalStore.toggleItem('loginForm', true);
		await signInWithGoogle();
	};

	async function updateLink() {
		const res_link = await LaunchCasino(idx, nick);
		link = res_link.link;
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
</script>

<main class="w-full py-[27px] md:pl-[30px] md:pr-[30px]" id="main">
	<div class="container-main-sm">
		<div class="pl-[15px] pr-[15px] md:pl-[0px] md:pr-[0px]">
			<BreadCrumb pages={breadCrumbPages} current={title} />
		</div>
		<div
			class="w-full flex flex-col bg-white dark:bg-white5 rounded-b-[14px] md:rounded-[14px] border-b-[4px] border-b-blue mt-[25px] overflow-hidden"
		>
			<div class="relative w-full min-h-[350px] md:min-h-[450px]">
				<iframe class="min-h-[350px] md:min-h-[450px]" src={link} width="100%" frameborder="0" />
				{#if !isLoggedIn}
					<div
						class="absolute left-0 top-0 bg-black60 backdrop-blur-[6px] w-full h-full flex items-center justify-center"
					>
						<button
							class="px-[15px] py-[10px] bg-linear rounded-[7px] flex items-center gap-[10px]"
							on:click={loginAndStart}
						>
							<svg
								width="16"
								height="15"
								viewBox="0 0 16 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_200_7965)">
									<path
										opacity="0.994"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M7.34082 -0.0146484C7.77052 -0.0146484 8.20019 -0.0146484 8.62988 -0.0146484C11.5685 0.351038 13.6632 1.87448 14.9141 4.55566C15.2157 5.29356 15.4062 6.05528 15.4854 6.84082C15.4854 7.27052 15.4854 7.70019 15.4854 8.12988C15.1197 11.0685 13.5962 13.1632 10.915 14.4141C10.1771 14.7157 9.41542 14.9062 8.62988 14.9854C8.20019 14.9854 7.77052 14.9854 7.34082 14.9854C4.4022 14.6197 2.30746 13.0962 1.05664 10.415C0.75498 9.67714 0.56455 8.91542 0.485352 8.12988C0.485352 7.70019 0.485352 7.27052 0.485352 6.84082C0.851038 3.9022 2.37448 1.80746 5.05566 0.556641C5.79356 0.25498 6.55528 0.0645504 7.34082 -0.0146484ZM6.43262 4.70215C6.60181 4.68091 6.75805 4.71507 6.90137 4.80469C8.06545 5.54871 9.23732 6.28113 10.417 7.00195C10.7537 7.16235 10.8465 7.41138 10.6953 7.74902C9.38937 8.60962 8.06612 9.44458 6.72559 10.2539C6.3793 10.3177 6.17911 10.1761 6.125 9.8291C6.10546 8.26661 6.10546 6.70409 6.125 5.1416C6.14334 4.93333 6.24588 4.78685 6.43262 4.70215Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_200_7965">
										<rect width="15" height="15" fill="white" transform="translate(0.5)" />
									</clipPath>
								</defs>
							</svg>
							<p class="text-sm font-medium text-white">{$LL.LOGIN_AND_GET_STARTED()}</p>
						</button>
					</div>
				{:else}
					<div
						class={`absolute left-0 top-0 bg-black60 backdrop-blur-[6px] w-full h-full flex items-center justify-center ${
							isPlay ? 'hidden' : ''
						}`}
					>
						<button
							class="px-[15px] py-[10px] bg-linear rounded-[7px] flex items-center gap-[10px]"
							on:click={() => {
								isPlay = true;
							}}
						>
							<svg
								width="16"
								height="15"
								viewBox="0 0 16 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_200_7965)">
									<path
										opacity="0.994"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M7.34082 -0.0146484C7.77052 -0.0146484 8.20019 -0.0146484 8.62988 -0.0146484C11.5685 0.351038 13.6632 1.87448 14.9141 4.55566C15.2157 5.29356 15.4062 6.05528 15.4854 6.84082C15.4854 7.27052 15.4854 7.70019 15.4854 8.12988C15.1197 11.0685 13.5962 13.1632 10.915 14.4141C10.1771 14.7157 9.41542 14.9062 8.62988 14.9854C8.20019 14.9854 7.77052 14.9854 7.34082 14.9854C4.4022 14.6197 2.30746 13.0962 1.05664 10.415C0.75498 9.67714 0.56455 8.91542 0.485352 8.12988C0.485352 7.70019 0.485352 7.27052 0.485352 6.84082C0.851038 3.9022 2.37448 1.80746 5.05566 0.556641C5.79356 0.25498 6.55528 0.0645504 7.34082 -0.0146484ZM6.43262 4.70215C6.60181 4.68091 6.75805 4.71507 6.90137 4.80469C8.06545 5.54871 9.23732 6.28113 10.417 7.00195C10.7537 7.16235 10.8465 7.41138 10.6953 7.74902C9.38937 8.60962 8.06612 9.44458 6.72559 10.2539C6.3793 10.3177 6.17911 10.1761 6.125 9.8291C6.10546 8.26661 6.10546 6.70409 6.125 5.1416C6.14334 4.93333 6.24588 4.78685 6.43262 4.70215Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_200_7965">
										<rect width="15" height="15" fill="white" transform="translate(0.5)" />
									</clipPath>
								</defs>
							</svg>
							<p class="text-sm font-medium text-white">{$LL.PLAY()}</p>
						</button>
					</div>
				{/if}
			</div>
			<div class="w-full hidden md:flex items-center gap-[17px] p-[15px]">
				<div class="flex items-center gap-[10px] bg-white5 px-[11px] py-[12px] rounded-[7px]">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_200_7978)">
							<path
								opacity="0.996"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.9844 6.14062C15.9844 6.29688 15.9844 6.45312 15.9844 6.60938C15.8752 6.86216 15.7086 7.07572 15.4844 7.25C14.397 8.18106 13.3189 9.12378 12.25 10.0781C12.5831 11.6505 12.9217 13.2234 13.2656 14.7969C13.2366 15.3416 12.9501 15.6332 12.4062 15.6719C12.2474 15.6673 12.0964 15.6309 11.9531 15.5625C10.6393 14.7598 9.31644 13.9733 7.98438 13.2031C6.6315 13.9838 5.28775 14.7807 3.95312 15.5938C3.50666 15.7677 3.13688 15.6687 2.84375 15.2969C2.71357 15.0846 2.6719 14.8554 2.71875 14.6094C3.07243 13.1012 3.40578 11.5907 3.71875 10.0781C2.51075 9.02634 1.31283 7.96384 0.125 6.89062C0.0748494 6.80653 0.0279744 6.72319 -0.015625 6.64062C-0.015625 6.47397 -0.015625 6.30728 -0.015625 6.14062C0.102707 5.79859 0.342291 5.59547 0.703125 5.53125C2.25578 5.39106 3.80788 5.24522 5.35938 5.09375C5.99362 3.6325 6.62381 2.16896 7.25 0.703125C7.5775 0.306675 7.97853 0.218134 8.45312 0.4375C8.5625 0.505209 8.65103 0.59375 8.71875 0.703125C9.34494 2.16896 9.97513 3.6325 10.6094 5.09375C12.2147 5.24062 13.8189 5.39687 15.4219 5.5625C15.7013 5.67003 15.8888 5.86275 15.9844 6.14062Z"
								fill="#FFC106"
							/>
						</g>
						<defs>
							<clipPath id="clip0_200_7978">
								<rect width="16" height="16" fill="white" />
							</clipPath>
						</defs>
					</svg>

					<p class="text-sm font-medium text-black50 dark:text-white50 capitalize">435</p>
				</div>
			</div>
		</div>

		<div class="pl-[15px] pr-[15px] md:pl-[0px] md:pr-[0px]">
			<SliderView title="Related Games" type="casino" category={type} />
			<!-- Recent Bet Deposits & Withdrawal History -->
			<ActivityTable title="Latest Bet & Race" showCols={[1, 0, 0]} />
			<!-- Footer -->
			<Footer banner={false} />
		</div>
	</div>
</main>
