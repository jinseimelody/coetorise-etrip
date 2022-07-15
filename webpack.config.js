const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const plugins = [];
plugins.push(
  new WebpackShellPluginNext({
    onBuildEnd: {
      scripts: [`nodemon ./build/bundle.js`],
      blocking: false,
      parallel: true
    }
  })
);

const config = {
  mode: 'development',
  watch: true,
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    clean: true
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['since 2016', 'ie >= 11']
                  }
                }
              ]
            ],
            plugins: [
              [
                'module-resolver',
                {
                  alias: {
                    '~': './src',
                    '@': './certificates'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

module.exports = config;
