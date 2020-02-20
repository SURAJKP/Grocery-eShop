var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: {
        bundle: path.join(__dirname, 'main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer : {
      contentBase : path.join(__dirname, 'dist'),
      port : 4444,
      hot : true
    },
    module: {
        rules: [
            {
                test: /\.(ttf|woff2|eot|woff|png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 6000
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attrs: false
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { minimize: true } }
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextWebpackPlugin("styles.css"),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ]
}

module.exports = config;