module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontSize: {
            base: '1.125rem', // This changes text-base to 18px
            title: '2.25rem', // This changes text-3xl to 36px
            lg: `1.25rem`, // This changes text-lg to 24px
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
