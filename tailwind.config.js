/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#01080E',
                'primary-med': '#011221',
                'primary-light': '#011627',
                'secondary-grey': '#607B96',
                'secondary-green': '#3C9D93',
                'secondary-purple': '#4D5BCE',
                'secondary-white': '#FFFFFF',
                'accent-yellow': '#FEA55F',
                'accent-green': '#43D9AD',
                'accent-orange': '#E99287',
                'accent-pink': '#C98BDF',
                'button-grey': '#1C2B3A',
                'button-grey-hover': '#263B50',
                line: '#1E2D3D',
            },
        },
    },
    plugins: [],
};
