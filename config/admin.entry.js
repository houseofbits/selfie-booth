const path = require('path');

module.exports = {
    entry: {
        'admin': './app/Assets/js/admin/main.js',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../public_photo_booth/assets/'),
    },
};