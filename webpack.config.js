var path = require('path');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:3001',
		path.resolve(__dirname, 'app/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/, exclude: /node_modules/, loader: 'babel'
		},
		{
			test: /\.css$/, loader: 'style!css?modules'
		}]
	},
	devServer: {
		port: 3001
	}
};