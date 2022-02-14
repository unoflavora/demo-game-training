const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prodWebpackConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		chunkFilename: 'chunks/[name].[contenthash].bundle.js',
	},
	performance: false,
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: 4,
				terserOptions: {
					compress: {
						drop_console: true
					},
					output: {
						comments: false
					},
				},
				extractComments: false
			}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
					  'default',
					  {
						discardComments: { removeAll: true },
					  },
					],
				  },
			  })
		],
		splitChunks: {
			chunks: 'initial',
		},
	},
	plugins: [
		new JavaScriptObfuscator({
			rotateUnicodeArray: true
		}, []),
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '..', 'src', 'assets'),
					to: path.resolve(__dirname, '..', 'dist')
				}
			]
		}),
		new webpack.DefinePlugin({
			DEVELOPMENT: JSON.stringify(false),
			PRODUCTION: JSON.stringify(true)
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
			chunkFilename: 'style.[contenthash].[id].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
              				sourceMap: false,
						},
					},
				]
			}
		]
	}
}

module.exports = (env) =>
	new Promise((resolve, reject) => {
		common(env)
			.then((config) => {
				resolve(merge(config, prodWebpackConfig));
			})
			.catch((err) => {
				reject(err);
			})
	});
