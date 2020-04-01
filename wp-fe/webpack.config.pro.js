const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:"production",
    entry:{
        'main':'./src/js/index.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name]-[hash].js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/views/index.html',
            filename:'index.html',
            chunks:['main']
        }),
        new miniCssExtractPlugin({
            filename:'[name]-[hash].css'
        }),
        new copyWebpackPlugin([{
            from:'./src/static',to:'./static'
        }])
    ],
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.html$/,
                use:['string-loader']
            }
        ]
    }
};
