
import { getCasinoInfo } from '@apis/casino';

/** @type {import('./$types').PageLoad} */
export const load = async ({params}) => {
    const {title, idx} = params
    
    const info = await getCasinoInfo(idx);

    return {
        title: info.title,
        type: info.type,
        idx
    }
}