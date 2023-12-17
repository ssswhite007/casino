
import { getCasinoInfo } from '@apis/casino';

/** @type {import('./$types').PageLoad} */
export const load = async ({params}) => {
    const {type} = params
    
    return {
        type,
    }
}