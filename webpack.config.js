const path = require('path')

module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
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
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devServer: {
        contentBase:[
            path.resolve(__dirname, 'public'),
            path.resolve(__dirname, 'public/css')
        ],
        historyApiFallback: true,
        publicPath: '/scripts/'
    },
    devtool: 'cheap-module-eval-source-map'
}