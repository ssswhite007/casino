import crypto from 'crypto';

/** create random code /2023-06-28/jino*/
export const generateRandomCode = (length: number): string =>  {
    let result :string             = '';
    const characters :string       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength :number = characters.length;

    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/** create random number /2023-07-01/jino */
export const generateRandomNumber = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // generates a random number between 0 and 9
    }
    return result;
}

/** create random number /2023-07-01/jino */
export const hashWithSHA256 = (password: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(process.env.SALT + password);
    return hash.digest('hex');
}