
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require("webpack");

module.exports = {    
    entry: {
      main: './app/Assets/js/main.js',    
      admin: './app/Assets/js/admin.js',
    },     
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'public/assets'),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif|obj)$/,
          use: [{
            loader:'file-loader',
            options: {
              outputPath: 'images/'
            }            
          }]
        },
        {
          test: /\.obj$/,
          use: [{
            loader:'file-loader',
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
     resolve: {
      alias: {
        '/bootstrap': path.resolve(__dirname, './node_modules/bootstrap/scss'),
      }
    },
    performance: { hints: false },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]    
  };
  