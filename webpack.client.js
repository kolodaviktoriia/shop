import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base.js';

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConfig, {
    mode: 'development',
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { modules: true } },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@use "/src/client/styles/variables.scss" as *; `,
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src/client/styles')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@use "/src/client/styles/variables.scss" as *; `,
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src/client/styles')],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'main.css' })],
    resolve: { extensions: ['.js', '.jsx', '.scss', '.sass'] },
});