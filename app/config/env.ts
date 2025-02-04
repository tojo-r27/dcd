export const envData = () => {
    const { BASE_URL, SESSION_SECRET } = process.env;
    
    return {
        BASE_URL: BASE_URL,
        SESSION_SECRET: SESSION_SECRET
    }
}