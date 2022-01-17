const path = require('path')
const Crx = require('webpack-crx')

const manifest = require('./src/manifest.json')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    './src/background.js',
    './src/manifest.json',
  ],
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /manifest\.json$/i,
        type: 'asset/resource',
        generator: {
          filename: 'manifest.json'
        }
      },
    ],
  },
  plugins: [
    new Crx({
      key: path.resolve(__dirname, 'dist.pem'),
      src: path.resolve(__dirname, 'dist'),
      dest: path.resolve(__dirname, 'dist'),
      name: manifest.name,
    }),
  ],
}
