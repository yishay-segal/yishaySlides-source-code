const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './ts/index.ts',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [{
                test: /\.scss$/i,
                use: [{
                        loader: miniCss.loader,
                        options: {
                            hmr: true,
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                      name: "[name].[hash].[ext]",
                      outputPath: "imgs"
                    }
                }
            },

            {
                test: /\.html$/,
                use: ["html-loader"]
            },
        ]
    }
}