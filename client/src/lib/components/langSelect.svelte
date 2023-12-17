<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Btn from '../components/btn.svelte';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';
	import { loadLocaleAsync } from '@src/i18n/i18n-util.async';

	$: path = $page.url.pathname;

	const languages = [
		{ icon: '/imgs/lang/uk.svg', value: 'EN', label: 'English' },
		{ icon: '/imgs/lang/jp.svg', value: 'JP', label: 'Japan' },
		{ icon: '/imgs/lang/kr.svg', value: 'KR', label: 'Korean' },
		{ icon: '/imgs/lang/ch.svg', value: 'CH', label: 'China' }
	];

	const switchLocale = async (newLocale, updateHistoryState = true) => {
		newLocale = newLocale.toLowerCase();
		console.log(newLocale);
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale));
		}

		const pureUrl = $page.url.pathname.slice(3);
		history.pushState(null, null, `/${$LL.LINK()}${pureUrl}`);
	};

	let dropdownActive = false;
	const handleDropdown = (val) => {
		return (dropdownActive = val);
	};
	let checkedIndex = 0;
	let checkedVal = languages[checkedIndex].value;
	const handleRadio = (val) => {
		const newIndex = languages.findIndex((language) => language.value === val);
		checkedIndex = newIndex;
		dropdownActive = false;
		switchLocale(languages[checkedIndex].value, false);
		return (checkedVal = val);
	};
    onMount(()=> {
        document.addEventListener('click', (e)=> {
            if(!e.target.closest("#lang-select")) {
                dropdownActive = false
            }
        })
    })
</script>

<div class="relative w-full" id="lang-select">
	<Btn
		label={languages[checkedIndex].value}
		variant="select"
		icon={languages[checkedIndex].icon}
		iconWidth={27}
		iconHeight={27}
		dropdown={true}
		dropdownIsActive={dropdownActive}
		className="w-full absolute w-full !bg-blackLight dark:bg-white5 {dropdownActive
			? 'border-primary'
			: 'border-white-5'}"
		onClick={handleDropdown}
	/>
	{#if dropdownActive}
		<div
			class="w-full absolute p-[15px] bg-black right-0 min-w-[390px] rounded-[14px] border border-white11 left-0 bottom-[calc(100%+11px)] overflow-hidden"
		>
			<img
				src="/imgs/Ellipse12.svg"
				alt="Elipse"
				width="290"
				height="400"
				class="absolute top-0 right-[0px] w-[290px] h-[400px]"
			/>

			<div class="w-full grid grid-cols-2 gap-[14px]">
				{#each languages as lang}
					<Btn
						label={lang.label}
						value={lang.value}
						variant="radio"
						checked={lang.value === checkedVal ? true : false}
						radioGroup="language"
						iconWidth={28}
						iconHeight={28}
						icon={lang.icon}
						className="lang-radio-btn bg-white-5 "
						onClick={handleRadio}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
