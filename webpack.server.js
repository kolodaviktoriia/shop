import path from 'path';
import { merge } from 'webpack-merge';
import webpackNodeExternals from 'webpack-node-externals';
import baseConfig from './webpack.base.js';

export default merge(baseConfig, {
    target: 'node',
    entry: './src/index.js',       // your server entry
    output: {
        filename: 'bundle.mjs',      // ESM output
        path: path.resolve('./build'),
        library: { type: 'module' }, // ✅ ESM
    },
    externals: [webpackNodeExternals({ importType: 'module' })],
    experiments: { outputModule: true }, // ✅ allows library type module
    module: {
        rules: [
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: { modules: { exportOnlyLocals: true } } // SSR: class names only
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: { exportOnlyLocals: true }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    mode: 'development',
});