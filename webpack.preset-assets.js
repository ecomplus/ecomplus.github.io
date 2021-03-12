const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/assets/index.js',
  output: {
    filename: 'page.min.js',
    path: path.resolve(__dirname, 'src/assets/js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/page.min.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
}
