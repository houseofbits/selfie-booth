const path = require('path');

module.exports = {
    entry: {
        'sharing': './app/Assets/js/sharing/main.js',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../public_sharing/assets/'),
    },
    node: {
        fs: 'empty'
    }
};