import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.js';

export default merge(baseConfig, {
    mode: 'development',
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./public'),
    },
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { modules: true } },
                    'sass-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'main.css' })],
});