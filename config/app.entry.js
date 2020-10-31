const path = require('path');

module.exports = {
    entry: {
        'main': './app/Assets/js/app/main.js',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../public_photo_booth/assets/'),
    },
};