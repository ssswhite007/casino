<script>
    import Btn from "../../../lib/components/btn.svelte";
    const languages = [
		{ image:'/imgs/lang/uk.svg', value: 'EN', label: 'English' },
		{ image:'/imgs/lang/kr.svg', value: 'KR', label: 'Korean' },
		{ image:'/imgs/lang/ch.svg', value: 'KR', label: 'Korean' },
		{ image:'/imgs/lang/jp.svg', value: 'KR', label: 'Korean' }
	];

	let dropdownActive = false;
	const handleDropdown = (val) => {
		return (dropdownActive = val);
	};
	let checkedIndex = 0
	let checkedVal = languages[checkedIndex].value
	const handleRadio = (val)=> {
		const newIndex = languages.findIndex(language => language.value === val);
		checkedIndex = newIndex
		dropdownActive = false
		return checkedVal = val
	}
</script>

<div class="relative">
	<!-- <Btn
		label={languages[checkedIndex].value}
		variant="default"
		iconPrepend={languages[checkedIndex].icon}
		iconWidth={27}
		iconHeight={27}
		dropdown={true}
		dropdownIsActive={dropdownActive}
		className="min-w-[140px] bg-white-5 border {dropdownActive ? 'border-primary' : 'border-white-5'}"
		onClick={handleDropdown}
	/> -->
	{#if dropdownActive}
		<div
			class="w-full  absolute p-[15px] bg-black-light right-0 min-w-[410px] rounded-[14px] border border-white-11 top-[calc(100%+11px)] overflow-hidden"
		>
			<img
				src="/src/assets/images/elipses/elipse1.svg"
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
						iconPrepend={lang.icon}
						className="lang-radio-btn bg-white-5 border border-white-5"
						onClick={handleRadio}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
