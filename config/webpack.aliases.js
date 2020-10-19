const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '/bootstrap': path.resolve(__dirname, '../node_modules/bootstrap/scss'),
            '/js/app': path.resolve(__dirname, '../app/Assets/js/app'),
            '/js/admin': path.resolve(__dirname, '../app/Assets/js/admin'),
            '/json': path.resolve(__dirname, '../app/Assets/json'),
            '/css': path.resolve(__dirname, '../app/Assets/css'),
            '/fonts': path.resolve(__dirname, '../app/Assets/fonts'),
        }
    }
};