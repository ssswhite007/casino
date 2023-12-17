import { writable } from 'svelte/store';

const globalStore = writable({
	sidebar: false,
	chatOpen: false,
	betSlip: false,
	registrationStep: 1,
	registrationForm: false,
	loginForm: false,
	forgotPasswordStep: 1,
	forgotPasswordForm: false,
	darkMode: true,
	userDetail: null,
	// userDetail: {
	// 	member_idx: 3,
	// 	email: 'g_115965063647480354431',
	// 	nick: 'user6474563937',
	// 	level: 1,
	// 	game_money: 0,
	// 	profileImage: 'https://storage.goodfriendszone.com/uploads/permanent/newbie.webp',
	// 	login_type: 'google',
	// 	affiliate_code: 'abcde'
	// }

	newDepositModal: false,
	addAgentModal: false,
});

const store = {
	subscribe: globalStore.subscribe,
	toggleItem: (item, value) => {
		globalStore.update((storeValues) => {
			return { ...storeValues, [item]: value };
		});
	}
};

export default store;
