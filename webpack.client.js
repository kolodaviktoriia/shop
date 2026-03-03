import path from 'path';
import { merge } from 'webpack-merge';
import base from './webpack.base.js';



export default merge(base, {
    entry: './src/client/client.js',
    output: { filename: 'bundle.js', path: path.resolve('public') },
    mode: 'development'
});