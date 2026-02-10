const getEnv = (key:string, defaultValue:string) => {
    const value = import.meta.env[key]
    if (value === undefined) return defaultValue
}

export default {
    apiBaseUrl: getEnv(
        'VITE_API_BASE_URL',
        'https://loancalculator-ivory.vercel.app'
    )
}
