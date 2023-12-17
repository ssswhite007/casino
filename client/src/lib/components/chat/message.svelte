<script>
	export let message;

	const message_content = JSON.parse(message.content).orj;

	const timestamp = new Date(message.time);

	const hours = timestamp.getHours();
	const minutes = timestamp.getMinutes();

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedTime = `${formattedHours}:${formattedMinutes}`;
</script>

<div class="flex items-start gap-[10px] mb-3">
	<div class="w-[30px] h-[30px] rounded-[10px] overflow-hidden">
		<img class="w-full" src={message.avatar} alt="friend's Profile Image" />
	</div>
	<div class="flex w-full flex-col gap-[5px]">
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-[5px]">
				<p class="text-msm text-black dark:text-white font-normal">{message.username}</p>
				<img src="/imgs/award1.svg" alt="" />
			</div>
			<p class="text-gray text-msm font-normal">{formattedTime}</p>
		</div>
		<p class="text-gray text-msm font-normal">
			{@html message_content}
		</p>
	</div>
</div>

<style>
</style>
