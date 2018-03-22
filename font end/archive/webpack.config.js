var htmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');

module.exports = {

    entry: './src/app/index.js',

    output:{

         path:path.resolve(__dirname,'./dist/js'),

         filename:'[bundle].js'

}

}