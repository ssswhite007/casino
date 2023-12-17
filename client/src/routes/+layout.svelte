<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import globalStore from '../store/globalStore';

	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import Header from '$lib/components/header/header.svelte';
	import Chat from '../lib/components/chat/chat.svelte';

	import ScrollUp from '$lib/components/scrollUp/scroll-up.svelte';

	// import Layout from '../lib/components/auth/layout.svelte';
	// import SignUp from '../lib/components/auth/sign-up.svelte';
	// import SignIn from '../lib/components/auth/sign-in.svelte';
	// import ForgotPassword from '../lib/components/auth/forgot-password.svelte';
	import '../base.css';
	import MainLoader from '@components/loader/mainLoader.svelte';
	import MobileNav from '@components/mobile-nav/mobileNav.svelte';
	import { getAccessToken, getRefreshToken } from '@apis/account';

	$: isChatOpen = $globalStore.chatOpen;
	$: userDetail = $globalStore.userDetail;
	// $: registrationForm = $globalStore.registrationForm;
	// $: loginForm = $globalStore.loginForm;
	// $: forgotPasswordForm = $globalStore.forgotPasswordForm;

	let loaderMain = false;
	function chatToggle(res) {
		handleChat(res);
	}

	function chatClose(res) {
		handleChat(res);
	}

	// function openForgotPasswordForm() {
	// 	globalStore.toggleItem('registrationForm', false);
	// 	globalStore.toggleItem('loginForm', false);

	// 	globalStore.toggleItem('forgotPasswordForm', true);

	// 	document.body.style.overflow = 'hidden';
	// }
	// function closeForm() {
	// 	globalStore.toggleItem('registrationForm', false);
	// 	globalStore.toggleItem('loginForm', false);
	// 	globalStore.toggleItem('forgotPasswordForm', false);
	// 	globalStore.toggleItem('registrationStep', 1);
	// 	globalStore.toggleItem('forgotPasswordStep', 1);

	// 	document.body.style.overflow = 'auto';
	// }

	// function openSignUpForm() {
	// 	globalStore.toggleItem('loginForm', false);
	// 	globalStore.toggleItem('forgotPasswordForm', false);
	// 	globalStore.toggleItem('registrationForm', true);

	// 	document.body.style.overflow = 'hidden';
	// }
	// function openSignInForm() {
	// 	globalStore.toggleItem('registrationForm', false);
	// 	globalStore.toggleItem('forgotPasswordForm', false);
	// 	globalStore.toggleItem('loginForm', true);

	// 	document.body.style.overflow = 'auto';
	// }

	onMount(async () => {
		await handleTokens();
		if (Cookies.get('Mode') == undefined) {
			Cookies.set('Mode', 'Dark');
			window.document.documentElement.classList.add('dark');
		} else if (Cookies.get('Mode') == 'Light') {
			window.document.documentElement.classList.remove('dark');
		} else if (Cookies.get('Mode') == 'Dark') {
			window.document.documentElement.classList.add('dark');
		}
		loaderMain = true;
		isChatOpen
			? document.body.classList.add('chat-active')
			: document.body.classList.remove('chat-active');
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
		}
	}
</script>

{#if !loaderMain}
	<MainLoader />
{/if}
<Header on:chatToggle={chatToggle} />
<Sidebar />
<!-- {#if userDetail} -->
	{#if isChatOpen}
		<div>
			<Chat on:chatClose={chatClose} />
		</div>
	{:else}
		<div class="translate-x-[-2000px] opacity-0 transition-all">
			<Chat on:chatClose={chatClose} />
		</div>{/if}
<!-- {/if} -->

<!-- {#if registrationForm}
	<Layout on:closeForm={closeForm}>
		<SignUp on:openSignIn={openSignInForm} on:closeForm={closeForm} />
	</Layout>
{/if}

<div class={loginForm ? 'block': 'hidden'}>
	<Layout on:closeForm={closeForm}>
		<SignIn
			on:openForgotPasswordForm={openForgotPasswordForm}
			on:openSignUp={openSignUpForm}
			on:closeForm={closeForm}
		/>
	</Layout>
</div>

{#if forgotPasswordForm}
	<Layout on:closeForm={closeForm}>
		<ForgotPassword on:openSignIn={openSignInForm} on:closeForm={closeForm} />
	</Layout>
{/if} -->

<ScrollUp />

<slot />

<MobileNav />
