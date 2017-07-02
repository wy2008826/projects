
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let glob = require('glob');
let autoprefixer = require('autoprefixer');


const ENTRY_PATH = './src/page/';


module.exports = function () {

    // let getEntries = function (root) {
    //     var entryFiles = glob.sync(root + '**/*.{js,jsx}');
    //     var map = {};
    //     for (var i = 0; i < entryFiles.length; i++) {
    //         var filePath = entryFiles[i].substring(ENTRY_PATH.length, entryFiles[i].lastIndexOf('\.'));
    //         map[filePath] = [entryFiles[i]];
    //     }
    //     return map;
    // }

    //公共配置
    let commonConfig = {
        entry: "./src/page/main.js",
        output: {
            path: path.resolve(__dirname, './dist/js/'),
            filename: '[name].min.js',
            publicPath: '/dist/',
            chunkFilename: './js/chunk/[name]-[id].common.js?[chunkhash]'//非主文件的命名规则
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true,//css模块化
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'file-loader',
                        }
                    ]
                },
                {test: /\.vue$/,loader: "vue-loader"},
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
                {test: /\.json$/, loader: 'json-loader'},
                {
                    test: /\.(png|jpe?g)$/,
                    loader: 'url-loader?name=image/[name].[ext]',
                    options: {
                        limit: 8000
                    }
                },
                {
                    test: /\.(woff|eot|svg|ttf)\??.*$/,
                    loader : 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
                    // options: {
                    //     limit: 8000,
                    //     name:"fonts/[name].[md5:hash:hex:t].[ext]"
                    // }
                },
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],
            extensions: ['.css', '.scss', 'sass','.js', '.jsx', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'vue': 'vue/dist/vue.js',
                'strategy': path.resolve(__dirname, './strategy'),
                'utils':path.resolve(__dirname, './routes/utils')
            }
        },
    };



    return commonConfig;

}

