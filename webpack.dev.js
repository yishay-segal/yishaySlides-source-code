const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
// const HtmlWebpackScriptsPlugin = require("html-webpack-scripts-plugin");
// const scriptDefer = new HtmlWebpackScriptsPlugin({
//     'defer ': /bundle/ 
// })

module.exports = merge(common, {
    mode: "development", 
    context: path.resolve(__dirname, './src'),
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './assets/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'slides.html',
            template: './assets/slides.html',
            // chunks: ['slidesEntry']
            scriptLoading: 'defer'
            // excludeChunks: ['node_modules']
        }),
        new miniCss({
            filename: 'bundle.css'
        }),
        // new HtmlWebpackScriptsPlugin({
        //     defaultAttribute: 'defer'
        // })
    ],
});