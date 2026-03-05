import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import webpackNodeExternals from 'webpack-node-externals';
import baseConfig from './webpack.base.js';

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConfig, {
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.mjs',
        path: path.resolve(__dirname, 'build'),
        library: { type: 'module' },
    },
    externals: [webpackNodeExternals({ importType: 'module' })],
    experiments: { outputModule: true },
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: { modules: { exportOnlyLocals: true } },
                    },
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
                    {
                        loader: 'css-loader',
                        options: { exportOnlyLocals: true },
                    },
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: { extensions: ['.js', '.jsx', '.scss', '.sass'] },
});