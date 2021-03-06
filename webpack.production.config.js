const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
 
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '360VR - Palazzo Medici - Il regno della purezza',
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
          }),
        
        new UglifyJsPlugin({
            parallel: 4,
            uglifyOptions: {
                warnings: false,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    // warnings: false
                },
            },
            cache: true,
        }),
    ],

};