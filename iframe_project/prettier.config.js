/** @type {import('prettier').Config} */
const config = {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    useTabs: false,
    printWidth: 160,
    endOfLine: 'crlf',
    plugins: ['prettier-plugin-tailwindcss'],
}

export default config
