<script>
	import { createEventDispatcher } from 'svelte';
	import ModalLayout from './modalLayout.svelte';
</script>

<ModalLayout title="Add Agent Code" id="addAgentModal" className="!min-h-max">
	<p class="mt-10 font-medium text-gray">
		Please register your agent code! Your agent can make many gifts for you.
	</p>

    <div class="relative z-[99] w-full flex flex-col gap-[15px] mt-[54px]">
		<p class="text-base text-black dark:text-white font-medium">Enter Code</p>
		<div class="relative flex items-center">
            <div class="w-full grid items-center bg-grayLight4 dark:bg-white5 rounded-[7px] focus:bg-red">
                <input
                    type="text"
                    placeholder="0.00"
                    class="w-full h-full bg-transparent border border-white5 rounded-[7px] py-[17px] outline-none text-black dark:text-white pl-[20px] pr-[120px] sm:pr-[110px]"
                />
                <div
                    class="absolute right-0 cursor-pointer flex items-center justify-center px-3 h-[52px] bg-primary px-6 rounded-[7px]"
                >
                    <p class="text-white text-base">Submit</p>
                </div>
            </div>
        </div>
	</div>
</ModalLayout>
