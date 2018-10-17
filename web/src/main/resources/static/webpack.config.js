
module.exports = {
    entry: './src/index.js',
    // output: {
    //     filename: 'bundle.js'
    // },
    resolve:{
        extensions:['.js', '.jsx']
    },
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
                use: {
                    loader: "css-loader"
                }
            }
        ]
    },
    watch: true,
    watchOptions:{
        aggregateTimeout: 100
    }
};