const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = {
    entry:  __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test: /\.css?/,
            use: 'css-loader'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    performance: { 
        hints: false 
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        mode: 'development',
        contentBase: path.join(__dirname, 'public'),
        host: "localhost",
        proxy: {
            '/index.js': {
                target: 'http://localhost:8080'
            },
            '/vendors.js': {
                target: 'http://localhost:8080'
            },
            '/**': {
                target: 'http://localhost:4000',
                secure: false,
                changeOrigin: true
            }
        }
    }
};
module.exports = config;
