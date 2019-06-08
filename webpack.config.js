/* eslint-disable */
const path = require(`path`);
module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.json`]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 8000,
    historyApiFallback: true,
  },
  devtool: `source-map`
};
