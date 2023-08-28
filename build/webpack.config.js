module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    cache: false,
    entry: {

        // 用例测试
        usecase: './test/usecase/index.ts'

    },
    output: {
        filename: pathData => './test/' + pathData.chunk.name + '/dist.js'
    },
    devServer: {
        static: './',
        port: 8080
    }
}