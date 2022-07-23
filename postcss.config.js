// const tailwindcss = require('tailwindcss');

// module.exports = {
// 	plugins: [
// 		'postcss-preset-env',
// 		tailwindcss,
// 		...(process.env.NODE_ENV === 'production' ? nano : []),
// 	],
// };

module.exports = {
	plugins: {
		tailwindcss: {},
		'postcss-preset-env': {
			stage: 1,
		},
		autoprefixer: {},
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
	},
};
