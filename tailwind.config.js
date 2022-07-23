/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			screens: {
				sm: '576px',
				md: '800px',
			},
		},
		container: {
			padding: { DEFAULT: '0.625rem', md: '0rem' },
		},
	},
	plugins: [require('daisyui')],
};
