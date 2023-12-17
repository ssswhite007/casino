<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import ModalLayout from '../modalLayout.svelte';
	import globalStore from '@store/globalStore';
	import toast from '../../toast/toast';
	import {
		changeProfileImage,
		changeNickname,
		getAccessToken,
		getRefreshToken
	} from '@apis/account';
	import { saveImageWebp, saveTempImage } from '@apis/image';
	import { LL, setLocale, locale } from '@src/i18n/i18n-svelte';

	const dispathEvent = createEventDispatcher();

	export let step;

	let input;
	let container;
	let image;
	let placeholder;
	let showImage = $globalStore.userDetail.profileImage == "" ? false : true;
	let cropper;

	let myProfileData = {
		photo: '',
		nickname: ''
	};

	function closeProfileModal() {
		dispathEvent('closeProfileModal');
	}

	function stepBack() {
		dispathEvent('stepBack');
	}

	onMount(() => {
		myProfileData.nickname = $globalStore.userDetail.nickname;
	});

	function dataURItoBlob(dataURI) {
		const byteString = atob(dataURI.split(',')[1]);
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: mimeString });
	}

	function onChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);

				cropper = new Cropper(image, {
					aspectRatio: 1,
					viewMode: 1,
					crop(event) {}
				});
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}

	function getRoundedCanvas(sourceCanvas) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var width = sourceCanvas.width;
		var height = sourceCanvas.height;

		canvas.width = width;
		canvas.height = height;
		context.imageSmoothingEnabled = true;
		context.drawImage(sourceCanvas, 0, 0, width, height);
		context.globalCompositeOperation = 'destination-in';
		context.beginPath();
		context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
		context.fill();
		return canvas;
	}

	async function handleMyProfile(event) {
		if(!cropper) {
			toast.error($LL.SELECT_IMAGE());
			return;
		}
		const canvas = cropper.getCroppedCanvas();
		const roundedCanvas = getRoundedCanvas(canvas);
		const imageData = roundedCanvas.toDataURL('image/png');

		const formData = new FormData();
		const blob = dataURItoBlob(imageData);
		formData.append('image', blob, 'image.png');

		const tempFile = await saveTempImage({ formData });
		const permanentFile = await saveImageWebp({ filename: tempFile.data.filename, ext: 'webp' });

		const res = await changeProfileImage({
			customerIdx: $globalStore.userDetail.customer_idx,
			profileImage: permanentFile.data.path
		});

		if (res.success) {
			// toast.success(res.data.message);
		} else {
			toast.error($LL[res.data.key]());
		}

		const res1 = await changeNickname({
			customerIdx: $globalStore.userDetail.customer_idx,
			nick: myProfileData.nickname
		});

		if (res1.success) {
			toast.success($LL[res1.data.key]());
			handleTokens();
		} else {
			toast.error($LL[res1.data.key]());
		}
	}

	async function handleTokens() {
		const res = await getAccessToken();
		if (res.success) {
			globalStore.toggleItem('userDetail', res.data);
			dispathEvent('closeProfileModal');
		} else if (4001) {
			const res1 = await getRefreshToken();
			if (res1.success) {
				const res2 = await getAccessToken();
				if (res2.success) {
					globalStore.toggleItem('userDetail', res2.data);
					dispathEvent('closeProfileModal');
				}
			} else {
				globalStore.toggleItem('userDetail', null);
			}
		} else {
			globalStore.toggleItem('userDetail', null);
		}
	}
</script>

<svelte:head>
	<link href="https://fengyuanchen.github.io/cropperjs/css/cropper.css" rel="stylesheet" />
	<script src="https://fengyuanchen.github.io/cropperjs/js/cropper.js"></script>
</svelte:head>

<ModalLayout
	on:stepBack={stepBack}
	{step}
	on:closeProfileModal={closeProfileModal}
	title="Edit Profile"
>
	<form on:submit={handleMyProfile}>
		<div class="flex justify-center w-full h-[200px] rounded-[14px] bg-gray preview mt-[24px]">
			<input bind:this={input} on:change={onChange} type="file" class="hidden" id="fileinput" />

			<div bind:this={container} class="h-[200px] flex items-center">
				{#if showImage}
					<img bind:this={image} alt="Preview" id="image" src={$globalStore.userDetail.profileImage} on:click={() => {
						input.click();
					}} class="h-[200px] cursor-pointer"/>
				{:else}
					<span
						class="cursor-pointer text-black dark:text-grayLight"
						bind:this={placeholder}
						on:click={() => {
							input.click();
						}}>Image Preview</span
					>
				{/if}
			</div>
		</div>

		<div class="relative z-[9] w-full flex flex-col gap-[16px] mt-[24px]">
			<p class="text-base font-normal text-black dark:text-white">Default Images</p>
			<div class="flex items-center flex-wrap gap-[15px]">
				<label class="cursor-pointer">
					<input checked type="radio" class="peer sr-only" />
					<div
						class="w-[78px] h-[78px] border-[2px] rounded-full border-transparent peer-checked:border-blue flex items-center justify-center transitin-al"
					>
						<div class="w-[69px] h-[69px] rounded-full">
							<img class="w-[69px]" src="/imgs/profile.svg" alt="profile" />
						</div>
					</div>
				</label>
				<label class="cursor-pointer">
					<input type="radio" class="peer sr-only" />
					<div
						class="w-[78px] h-[78px] border-[2px] rounded-full border-transparent peer-checked:border-blue flex items-center justify-center transitin-al"
					>
						<div class="w-[69px] h-[69px] rounded-full">
							<img class="w-[69px]" src="/imgs/profile2.svg" alt="profile" />
						</div>
					</div>
				</label>
				<label class="cursor-pointer">
					<input type="radio" class="peer sr-only" />
					<div
						class="w-[78px] h-[78px] border-[2px] rounded-full border-transparent peer-checked:border-blue flex items-center justify-center transitin-al"
					>
						<div class="w-[69px] h-[69px] rounded-full">
							<img class="w-[69px]" src="/imgs/profile3.svg" alt="profile" />
						</div>
					</div>
				</label>
				<label class="cursor-pointer">
					<input type="radio" class="sr-only peer" />
					<div
						class="w-[78px] h-[78px] border-[2px] rounded-full border-transparent peer-checked:border-blue flex items-center justify-center transitin-al"
					>
						<div class="w-[69px] h-[69px] rounded-full">
							<img class="w-[69px]" src="/imgs/profile4.svg" alt="profile" />
						</div>
					</div>
				</label>
			</div>
		</div>

		<div class="relative z-[99] w-full flex flex-col gap-[15px] mt-[24px]">
			<p class="text-base text-black dark:text-white font-normal">Edit Nickname</p>
			<div class="w-full grid items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red">
				<input
					type="text"
					class="w-full h-full bg-transparent py-[17px] outline-none text-black dark:text-white pl-[20px]"
					required
					bind:value={myProfileData.nickname}
				/>
			</div>
		</div>

		<button
			class="relative z-[99] w-full py-[14px] bg-linear rounded-[7px] mt-[30px] text-white font-medium opacity-80 hover:opacity-100 transition-all"
			>Save</button
		>
	</form>
</ModalLayout>
