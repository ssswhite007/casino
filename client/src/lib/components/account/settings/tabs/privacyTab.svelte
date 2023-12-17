<script>
	import Switch from '../../../switch/switch.svelte';
</script>

<div class="w-full">
	<div
		class="w-full flex items-center justify-between pb-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
				Hide my gaming data on my profile
			</p>
			<p class="text-grayDark40 font-medium text-msm sm:text-sm">
				Even if hidden, your avatar and username are always visible in chatrooms.
			</p>
		</div>
		<Switch checked={false} />
	</div>

	<div
		class="w-full flex items-center justify-between py-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
				Hide my username from public lists
			</p>
			<p class="text-grayDark40 font-medium text-msm sm:text-sm">
				If hidden, no one can view your profile by clicking on your avatar or username on public
				rankings or bets list.
			</p>
		</div>
		<Switch checked={true} />
	</div>

	<div
		class="w-full flex items-center justify-between py-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
				Hide my online presence in private chat
			</p>
		</div>
		<Switch checked={true} />
	</div>

	<div
		class="w-full flex items-center justify-between py-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
				Allow private messages from strangers
			</p>
		</div>
		<Switch checked={false} />
	</div>

	<div
		class="w-full flex items-center justify-between py-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">
				Refuse any new friend request
			</p>
		</div>
		<Switch checked={false} />
	</div>

	<div
		class="w-full flex items-center justify-between py-[25px] border-b border-white11 gap-[25px]"
	>
		<div class="flex flex-col gap-[6px]">
			<p class="text-sm sm:text-base text-grayDark font-medium leading-[20px]">Refuse tip from strangers</p>
		</div>
		<Switch checked={true} />
	</div>
</div>
