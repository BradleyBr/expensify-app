const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const isProduction = env === 'production'
    
    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.resolve(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env'],
                        plugins: ['transform-object-rest-spread', 'transform-class-properties']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ],
        devServer: {
            contentBase:[
                path.resolve(__dirname, 'public')
            ],
            historyApiFallback: true,
            publicPath: '/dist/'
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map'
    }
}


