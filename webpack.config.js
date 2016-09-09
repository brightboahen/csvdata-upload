/**
 * Created by Bright on 20/08/2016.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};
// const TARGET = process.env.npm_lifecycle_event;
// process.env.BABEL_ENV = TARGET;
module.exports = {
    module :{
        loaders :[{
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.app
        },{ test: /\.css$/, loader: "style!css" },{
            test: /\.jsx?$/,         // Match both .js and .jsx files
            exclude: /node_modules/,
            loader: "babel",
            query:
            {
                presets:[
                    'es2015',
                    'react'
                ]
            }
        },
            {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=25000',
                include: PATHS.images
            },
            {
                test: /\.svg$/,
                loader: 'file',
                include: PATHS.images
            }
        ]
    },
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve:{
        extensions :['','.js','.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'lost my name',
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        })
    ],
    node :{
            fs : "empty"
    }
};