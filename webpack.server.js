import path from 'path';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig from './webpack.base.js';

export default merge(baseConfig, {
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'bundle.mjs',
        path: path.resolve('build'),
        libraryTarget: 'module'
    },
    externals: [nodeExternals({ importType: 'module' })],
    experiments: {
        outputModule: true
    },
    mode: 'development',
    devtool: 'source-map'
});