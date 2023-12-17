<script>
    export let checked;
</script>
<label class="relative cursor-pointer">
    <input checked={checked} type="checkbox" name="" class="peer sr-only">
    <div class="w-[28px] h-[11px] rounded-full bg-grayLight dark:bg-white11 peer-checked:bg-blue peer-checked:opacity-50 transition-all"></div>
    <div class="peer-checked:left-[calc(100%-10px)] transition-all absolute top-[50%] left-[-5px] translate-y-[-50%] w-[16px] h-[16px] rounded-full bg-linear"></div>
</label>