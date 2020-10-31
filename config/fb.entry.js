const path = require('path');

module.exports = {
    entry: {
        'fb': './app/Assets/js/facebook/main.js',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../public_facebook/assets/'),
    },
};