<script>
	import { writable } from 'svelte/store';
	import { onMount } from "svelte";
	import globalStore from '@store/globalStore';
	import Select from '../../../select/select.svelte';
	import Switch from '../../../switch/switch.svelte';
	import SelectPlugin from 'svelte-select';
	import Cookies from 'js-cookie';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	let darkMode;

	onMount(() => {
		darkMode = false;
		if(Cookies.get('Mode') == undefined) {
			window.document.body.classList.add('dark')
		}
		else if(Cookies.get('Mode') == 'Light') {
			window.document.body.classList.remove('dark')
		}
		else if(Cookies.get('Mode') == 'Dark') {
			window.document.body.classList.add('dark')
			darkMode = true;
		}
	});

	function handleChange(val) {
		if(val === 'dark') {
			// globalStore.toggleItem('darkMode', true)
			Cookies.set('Mode', 'Dark');
			darkMode = true;
			document.documentElement.classList.add('dark')
		}else {
			// globalStore.toggleItem('darkMode', false)
			Cookies.set('Mode', 'Light');
			darkMode = false;
			document.documentElement.classList.remove('dark')
		}
	}

	const valuteSettings = [
		{ value: 'KRW', label: 'KRW', image: '/imgs/flag1.svg' },
		{ value: 'KRW2', label: 'KRW2', image: '/imgs/bank.svg' },
		{ value: 'KRW3', label: 'KRW3', image: '/imgs/flag1.svg' }
	];

	const items = [
		{ value: 'EN', label: 'English' },
		{ value: 'KR', label: 'Korean' }
	];
	let selectedValue = writable(items[0].value);
</script>

<div class="w-full">
	<div class="w-full flex items-center justify-between pb-[25px] gap-[20px] border-b border-grayLight dark:border-white11">
		<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
			{$LL.SHOW_FULL_NAME_OF_CURRENCY_IN_CRYPTO_LIST()}
		</p>
		<Switch checked={true} />
	</div>

	<div class="w-full flex flex-col pb-[25px] border-b border-grayLight dark:border-white11">
		<p class="text-sm sm:text-base text-black dark:text-white font-medium mt-[25px] mb-[20px]">{$LL.FIAT_CURRENCY()}</p>

		<div class="w-full flex items-center justify-between gap-[20px]">
			<div class="w-full max-w-[255px]">
				<Select items={valuteSettings} />
			</div>
			<Switch checked={true} />
		</div>
	</div>

	<div class="flex flex-col mt-[19px] pb-[25px] border-b border-b-grayLight dark:border-b-white11">
		<p class="text-sm sm:text-base text-black dark:text-white font-medium mt-[25px] mb-[20px]">{$LL.THEME()}</p>
		<div
			class="max-w-[255px] w-full flex items-center justify-around bg-grayLight4 dark:bg-white5 rounded-[7px] p-[5px]"
		>
		<label class="w-[48%] cursor-pointer">
			<input on:change={()=> handleChange('light')} type="radio"  name="colorModes" checked={!darkMode ? true : false} value="light" class="custom-peer sr-only" />
			<div
				class="flex items-center justify-center gap-[6px] parent border border-transparent transition-all w-full rounded-[7px] p-[6px]"
			>
				<svg class="w-[16px] h-[16px]">
					<use class="icon stroke" href="/imgs/icons/icons.svg#sun" />
				</svg>
				<p class="text-black50 dark:text-white50 font-medium text-msm text">{$LL.LIGHT()}</p>
			</div>
		</label>
		<label class="w-[48%] cursor-pointer">
			<input on:change={()=> handleChange('dark')} type="radio" checked={darkMode} name="colorModes" value="dark" class="custom-peer sr-only" />
			<div
				class="flex items-center justify-center gap-[6px] parent border border-transparent transitiona-all w-full rounded-[7px] p-[6px]"
			>
				<svg class="w-[16px] h-[16px]">
					<use class="icon fill-grayDark2" href="/imgs/icons/icons.svg#moon" />
				</svg>
				<p class="text-black50 dark:text-white50 font-medium text-msm text">{$LL.DARK()}</p>
			</div>
		</label>
		</div>
	</div>

	<div class="w-full flex flex-col pb-[25px] border-b border-grayLight dark:border-white11">
		<p class="text-sm sm:text-base text-black dark:text-white font-medium mt-[25px] mb-[20px]">{$LL.LANGUAGE()}</p>

		<div class="w-full flex items-center justify-between">
			<div class="w-full max-w-[255px]">
				<SelectPlugin
					class="!flex !gap-[8px] !py-[5px] !pl-[15px] lang-select custom-select max !max-w-full !rounded-[7px] !w-full !gap-[17px] !bg-white5 !backdrop-blur-[8px] !border-[1.5px] !border-grayLight dark:!border-white11 !pl-[10px]"
					{items}
					clearable={false}
					label="label"
					showChevron
					searchable={false}
					bind:value={$selectedValue}
				>
					<div slot="prepend">
						<img class="min-w-[34px]" src="/imgs/global.svg" alt="" />
					</div>
					<div slot="item" let:item>{item.label}</div>
				</SelectPlugin>
			</div>
		</div>
	</div>
</div>
