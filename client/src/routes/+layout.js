import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { setLocale } from '@src/i18n/i18n-svelte';

/** @type {import('./$types').PageLoad} */
export const load = (async (event) => {
    let lang = "en";

    await loadLocaleAsync(lang);
    setLocale(lang);

    return event.data;
})