
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    resolve:{
        extensions:['.js', '.jsx']
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: "url-loader"
                }
            }
        ]
    },
    watch: true,
    watchOptions:{
        aggregateTimeout: 1000
    }
};