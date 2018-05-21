module.exports = {
  context: __dirname + '/src',
  entry: './js/root.js',       //入口文件
  output: {                     //出口文件
    //path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
}
