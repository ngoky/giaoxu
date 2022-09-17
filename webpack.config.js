const path = require('path')

module.exports = {
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@/*': path.resolve(__dirname, './src/*'),
            // '@/components': path.resolve(__dirname, './src/components')
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
        ],
    },
}
