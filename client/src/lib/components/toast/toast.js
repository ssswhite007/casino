import Toast from "svelte-toast";

const toastOptions = {
    duration: 1500,
    position: "top-right",
    dismissible: true,
  };
const toast = new Toast(toastOptions);

export default toast;