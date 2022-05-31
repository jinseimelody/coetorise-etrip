const nodeExternals = require('webpack-node-externals') 
const path = require('path')

const config = {
    mode: "production",
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")],
    },
    entry: './app.mjs',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        clean: true
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: ["since 2016", "ie >= 11"]
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
        ]
    },
}

module.exports = config