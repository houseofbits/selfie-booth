const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|obj)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.obj$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'objects/'
                    }
                }]
            },
            {
                test: /\.fx$/i,
                use: 'raw-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'fonts',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
};