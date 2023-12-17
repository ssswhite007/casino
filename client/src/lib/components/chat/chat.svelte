<script>
	import globalStore from '@store/globalStore';
	import { createEventDispatcher } from 'svelte';
	const SOCKET_SERVER = import.meta.env.VITE_SOCKET_SERVER;
	const dispatch = createEventDispatcher();

	$: chatOpen = $globalStore.chatOpen;

	function chatClose(e) {
		chatOpen ? document.body.classList.remove('chat-active') : document.body.classList.add('chat-active');
		globalStore.toggleItem('chatOpen', false);
	}

	import { io, Socket } from 'socket.io-client';
	import Messages from './messages.svelte';
	import SendForm from './sendForm.svelte';

	const clientData = {
		api_key: 'GF-AAAAAAAAAAA',
		user_id: '123',
		username: 'ismail',
		translate: true,
		locale: 'ja',
		role: 'user'
	};

	const socket = io(SOCKET_SERVER, {
		auth: {
			api_key: 'GF-AAAAAAAAAAA',
			user_id: '123',
			username: 'ismail',
			translate: true,
			locale: 'ja',
			role: 'user'
		},
		withCredentials: true
	});

	const api_key = clientData.api_key;

	const room_name = 'test2';
	let room_data = api_key + ':' + room_name;

	socket.emit('joinRoom', room_data, (response) => {
		//console.log(response);
	});

	socket.on('connect', () => {
		console.log(socket.id + ' connected');
	});

	import { afterUpdate, onMount, tick } from 'svelte';

	let messages = [];
	let messages_element;
	let my_message_text = '';

	onMount(() => {
		scrollToBottom(messages_element);
	});

	afterUpdate(() => {
		console.log('afterUpdate');
		if (messages) scrollToBottom(messages_element);
	});

	const scrollToBottom = async (node) => {
		if (node) {
			await tick();
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}
	};
	let emojiModalOpen;
	// socket.on('messages', async (message) => {
	// 	messages = messages.concat(message);
	// 	messages = messages.slice().reverse();
	// 	await tick();
	// });

	function send_message() {
		const message = {
			to: room_data,
			from: null,
			username: $globalStore.userDetail.nickname,
			avatar: $globalStore.userDetail.profileImage,
			content: my_message_text,
			time: new Date().toString()
		};
		socket.emit('sendMessage', message);
		my_message_text = '';
		emojiModalOpen = false;
	}

	socket.on('sendMessage', async (message) => {
		const messageParts = message.split('/*-');
		const formattedMessage = {
			to: messageParts[0],
			from: messageParts[1],
			username: messageParts[2],
			avatar: messageParts[3],
			content: messageParts[4],
			time: new Date(messageParts[5]).getTime()
		};
		messages = [...messages, formattedMessage];
		await tick();
	});
</script>

<div class="fixed right-0 md:w-auto w-full top-[80px] md:top-[85px] bg-white dark:bg-black border !border-t-[0px] border-grayLight4 dark:border-white5 z-[99999999] md:z-[999]">
	<div class="w-full md:w-[297px] h-[calc(100vh-86px)]">
		<div class="sticky flex top-0 w-full px-[12px] py-[18px] bg-white dark:bg-black21 border border-grayLight4 dark:border-white5 backdrop-blur-[34px] justify-between">
			<p class="text-black dark:text-white text-base font-semibold">Live Chat</p>
			<div class="flex items-center gap-[21px]">
				<div id="info" class="cursor-pointer opacity-60 hover:opacity-100">
					<svg class="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.99996 18.3334C14.5833 18.3334 18.3333 14.5834 18.3333 10C18.3333 5.41669 14.5833 1.66669 9.99996 1.66669C5.41663 1.66669 1.66663 5.41669 1.66663 10C1.66663 14.5834 5.41663 18.3334 9.99996 18.3334Z"
							stroke="#595A69"
							stroke-width="1.25"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path d="M10 6.66669V10.8334" stroke="#595A69" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M9.99512 13.3333H10.0026" stroke="#595A69" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<div id="prize" class="cursor-pointer opacity-60 hover:opacity-100">
					<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_341_13379)">
							<path
								opacity="0.994"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M3.69238 -0.0185547C5.62207 -0.0185547 7.55176 -0.0185547 9.48145 -0.0185547C9.48145 0.822592 9.48145 1.66374 9.48145 2.50488C9.30095 2.52401 9.14631 2.59822 9.01758 2.72754C8.86294 3.03678 8.70835 3.34603 8.55371 3.65527C8.18559 3.73881 7.81449 3.80683 7.44043 3.85937C7.08745 4.05179 6.99467 4.33011 7.16211 4.69434C7.40952 4.94174 7.65689 5.18911 7.9043 5.43652C7.88856 5.79737 7.84529 6.15611 7.77441 6.51269C7.81026 6.97515 8.05767 7.1669 8.5166 7.08789C8.83337 6.92331 9.15496 6.76871 9.48145 6.62402C9.48145 9.71646 9.48145 12.8089 9.48145 15.9014C8.19497 15.9014 6.90854 15.9014 5.62207 15.9014C6.58502 14.7798 7.24679 13.4933 7.60742 12.042C7.70565 11.6261 7.75515 11.2055 7.75586 10.7803C6.85588 10.3515 6.11989 9.72681 5.54785 8.90625C3.36448 8.69992 1.72548 7.65466 0.630859 5.77051C0.304766 5.12024 0.0882947 4.43988 -0.0185547 3.72949C-0.0185547 2.96256 -0.0185547 2.19564 -0.0185547 1.42871C0.0487918 1.28106 0.16012 1.17591 0.31543 1.11328C1.32968 1.09473 2.344 1.08854 3.3584 1.09473C3.35223 0.834668 3.35841 0.574902 3.37695 0.31543C3.43959 0.16012 3.54473 0.0487918 3.69238 -0.0185547ZM4.73145 7.58887C3.26316 7.19773 2.19317 6.31947 1.52148 4.9541C1.1678 4.07372 1.02555 3.15834 1.09473 2.20801C1.87065 2.19588 2.64376 2.20825 3.41406 2.24512C3.53919 4.10626 3.97831 5.88751 4.73145 7.58887Z"
								fill="#FED842"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.48145 -0.0185547C11.4111 -0.0185547 13.3408 -0.0185547 15.2705 -0.0185547C15.4182 0.0487918 15.5233 0.16012 15.5859 0.31543C15.6045 0.574902 15.6107 0.834668 15.6045 1.09473C16.6189 1.08854 17.6332 1.09473 18.6475 1.11328C18.8028 1.17591 18.9141 1.28106 18.9814 1.42871C18.9814 2.19564 18.9814 2.96256 18.9814 3.72949C18.619 5.9169 17.4315 7.4817 15.4189 8.42383C14.7724 8.67825 14.1044 8.83904 13.415 8.90625C12.843 9.72681 12.107 10.3515 11.207 10.7803C11.2755 12.2349 11.7084 13.5709 12.5059 14.7881C12.7788 15.1658 13.0572 15.5369 13.3408 15.9014C12.0607 15.9384 10.7742 15.9508 9.48145 15.9385C8.18867 15.9508 6.9022 15.9384 5.62207 15.9014C6.90854 15.9014 8.19497 15.9014 9.48145 15.9014C9.48145 12.8089 9.48145 9.71646 9.48145 6.62402C9.80022 6.75866 10.1094 6.91329 10.4092 7.08789C10.8859 7.18397 11.1457 6.99222 11.1885 6.5127C11.1055 6.15774 11.0622 5.79901 11.0586 5.43652C11.306 5.18912 11.5534 4.94174 11.8008 4.69434C11.9739 4.36347 11.9058 4.09751 11.5967 3.89648C11.1981 3.82809 10.8023 3.74768 10.4092 3.65527C10.2545 3.34603 10.0999 3.03678 9.94531 2.72754C9.81721 2.59854 9.66258 2.52432 9.48145 2.50488C9.48145 1.66374 9.48145 0.822592 9.48145 -0.0185547ZM14.2314 7.58887C14.9846 5.88751 15.4237 4.10626 15.5488 2.24512C16.3191 2.20825 17.0922 2.19588 17.8682 2.20801C18.047 4.60383 17.0698 6.32941 14.9365 7.38477C14.706 7.47194 14.471 7.53996 14.2314 7.58887Z"
								fill="#F9BD2C"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.48144 2.50488C9.48144 3.87793 9.48144 5.25098 9.48144 6.62402C9.15495 6.76871 8.83336 6.92331 8.5166 7.08789C8.05767 7.1669 7.81026 6.97515 7.77441 6.5127C7.84529 6.15611 7.88856 5.79738 7.90429 5.43652C7.65688 5.18912 7.40951 4.94174 7.1621 4.69434C6.99467 4.33011 7.08744 4.05179 7.44042 3.85938C7.81449 3.80683 8.18558 3.73881 8.55371 3.65527C8.70834 3.34603 8.86294 3.03678 9.01757 2.72754C9.14631 2.59822 9.30094 2.52401 9.48144 2.50488Z"
								fill="#FABE2C"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.48145 2.50488C9.66258 2.52432 9.81721 2.59854 9.94531 2.72754C10.0999 3.03678 10.2545 3.34603 10.4092 3.65527C10.8023 3.74768 11.1981 3.82809 11.5967 3.89648C11.9058 4.09751 11.9739 4.36347 11.8008 4.69434C11.5534 4.94174 11.306 5.18912 11.0586 5.43652C11.0622 5.79901 11.1055 6.15774 11.1885 6.5127C11.1457 6.99222 10.8859 7.18397 10.4092 7.08789C10.1094 6.91329 9.80021 6.75866 9.48145 6.62402C9.48145 5.25098 9.48145 3.87793 9.48145 2.50488Z"
								fill="#FE9100"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.62212 15.9014C6.90225 15.9384 8.18872 15.9508 9.4815 15.9385C9.4815 16.5817 9.4815 17.2249 9.4815 17.8682C8.18267 17.8682 6.88384 17.8682 5.58502 17.8682C5.57277 17.2061 5.58513 16.5505 5.62212 15.9014Z"
								fill="#FE9100"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M13.3408 15.9014C13.3778 16.5505 13.3902 17.2061 13.3779 17.8682C12.0791 17.8682 10.7803 17.8682 9.48145 17.8682C9.48145 17.2249 9.48145 16.5817 9.48145 15.9385C10.7742 15.9508 12.0607 15.9384 13.3408 15.9014Z"
								fill="#FE9100"
							/>
							<path
								opacity="0.996"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.5849 17.8682C6.88373 17.8682 8.18256 17.8682 9.48139 17.8682C9.48139 18.2392 9.48139 18.6103 9.48139 18.9814C7.92279 18.9814 6.3642 18.9814 4.8056 18.9814C4.49841 18.8114 4.39328 18.5517 4.49017 18.2021C4.54584 18.0475 4.65097 17.9424 4.8056 17.8867C5.06507 17.8682 5.32484 17.862 5.5849 17.8682Z"
								fill="#FABE2C"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.48145 17.8682C10.7803 17.8682 12.0791 17.8682 13.3779 17.8682C13.638 17.862 13.8978 17.8682 14.1572 17.8867C14.4695 18.0481 14.5746 18.3016 14.4727 18.6475C14.41 18.8028 14.3049 18.9141 14.1572 18.9814C12.5986 18.9814 11.04 18.9814 9.48145 18.9814C9.48145 18.6103 9.48145 18.2392 9.48145 17.8682Z"
								fill="#FABE2C"
							/>
						</g>
						<defs>
							<clipPath id="clip0_341_13379">
								<rect width="19" height="19" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</div>

				<div on:click={chatClose} id="close" class="cursor-pointer opacity-60 hover:opacity-100">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.3335 3.33331L16.6668 16.6666" stroke="#595A69" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M16.6667 3.33331L3.77783 16.2222" stroke="#595A69" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</div>
		<div class="relative" style="height: 100%;max-height: 100%;">
			<div class="w-full flex items-start justify-start max-h-full overflow-auto scrollbar-hidden" style="height: calc(100% - 63px);">
				<div class="w-full flex flex-col gap-[25px] px-[14px] py-[20px]" style="position: relative;height: 100%;">
					<Messages {messages} bind:messages_element />
					<SendForm bind:my_message_text {send_message} {socket} {room_data} {emojiModalOpen} />
					<!-- Chat Item -->
				</div>
			</div>
		</div>
	</div>
</div>
