const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	mode,
	module: {
		rules: [
			{
				test: /\.(s[ac]ss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(js)$/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	devServer: {
		static: 'dist',
		port: 8080,
		open: true,
		hot: true,
	},
	devtool:
		process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: [{ from: 'static', to: 'static', noErrorOnMissing: true }],
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new HtmlWebpackPlugin({
			filename: 'confirm.html',
			template: './src/confirm.html',
		}),
	],
};
